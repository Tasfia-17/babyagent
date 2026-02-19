// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IDiplomaNFT {
    function getAgentDiploma(uint256 agentId) external view returns (uint256);
}

contract JobMatchingBoard is Ownable, ReentrancyGuard {
    IDiplomaNFT public diplomaNFT;
    
    struct Job {
        uint256 jobId;
        address employer;
        string title;
        string description;
        uint256 payment;
        uint256 deadline;
        bool active;
        uint256 assignedAgent;
        bool completed;
    }
    
    struct Application {
        uint256 agentId;
        address agentOwner;
        uint256 timestamp;
    }
    
    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Application[]) public jobApplications;
    mapping(uint256 => uint256) public agentCurrentJob; // agentId => jobId
    
    uint256 public jobCount;
    uint256 public platformFee = 5; // 5%
    
    event JobPosted(uint256 indexed jobId, address employer, string title, uint256 payment);
    event JobApplied(uint256 indexed jobId, uint256 indexed agentId, address agentOwner);
    event JobAssigned(uint256 indexed jobId, uint256 indexed agentId);
    event JobCompleted(uint256 indexed jobId, uint256 indexed agentId, uint256 payment);
    
    constructor(address _diplomaNFT) Ownable(msg.sender) {
        diplomaNFT = IDiplomaNFT(_diplomaNFT);
    }
    
    function postJob(
        string memory title,
        string memory description,
        uint256 deadline
    ) external payable returns (uint256) {
        require(msg.value > 0, "Payment required");
        require(deadline > block.timestamp, "Invalid deadline");
        
        uint256 jobId = jobCount++;
        
        jobs[jobId] = Job({
            jobId: jobId,
            employer: msg.sender,
            title: title,
            description: description,
            payment: msg.value,
            deadline: deadline,
            active: true,
            assignedAgent: 0,
            completed: false
        });
        
        emit JobPosted(jobId, msg.sender, title, msg.value);
        
        return jobId;
    }
    
    function applyForJob(uint256 jobId, uint256 agentId) external {
        require(jobs[jobId].active, "Job not active");
        require(jobs[jobId].assignedAgent == 0, "Job already assigned");
        require(diplomaNFT.getAgentDiploma(agentId) > 0, "Agent must be graduated");
        require(agentCurrentJob[agentId] == 0, "Agent already has job");
        
        jobApplications[jobId].push(Application({
            agentId: agentId,
            agentOwner: msg.sender,
            timestamp: block.timestamp
        }));
        
        emit JobApplied(jobId, agentId, msg.sender);
    }
    
    function assignJob(uint256 jobId, uint256 agentId) external {
        Job storage job = jobs[jobId];
        require(msg.sender == job.employer, "Not employer");
        require(job.active, "Job not active");
        require(job.assignedAgent == 0, "Already assigned");
        
        job.assignedAgent = agentId;
        agentCurrentJob[agentId] = jobId;
        
        emit JobAssigned(jobId, agentId);
    }
    
    function completeJob(uint256 jobId) external nonReentrant {
        Job storage job = jobs[jobId];
        require(msg.sender == job.employer, "Not employer");
        require(job.assignedAgent > 0, "No agent assigned");
        require(!job.completed, "Already completed");
        
        job.completed = true;
        job.active = false;
        
        uint256 fee = (job.payment * platformFee) / 100;
        uint256 agentPayment = job.payment - fee;
        
        // Find agent owner
        Application[] memory applications = jobApplications[jobId];
        address agentOwner;
        for (uint256 i = 0; i < applications.length; i++) {
            if (applications[i].agentId == job.assignedAgent) {
                agentOwner = applications[i].agentOwner;
                break;
            }
        }
        
        require(agentOwner != address(0), "Agent owner not found");
        
        agentCurrentJob[job.assignedAgent] = 0;
        
        payable(agentOwner).transfer(agentPayment);
        
        emit JobCompleted(jobId, job.assignedAgent, agentPayment);
    }
    
    function getJobApplications(uint256 jobId) external view returns (Application[] memory) {
        return jobApplications[jobId];
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 10, "Fee too high");
        platformFee = newFee;
    }
}
