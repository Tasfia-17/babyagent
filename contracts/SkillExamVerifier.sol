// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IBabyAgentFactory {
    function ownerOf(uint256 tokenId) external view returns (address);
    function upgradeStatus(uint256 tokenId, uint8 newStatus) external;
}

contract SkillExamVerifier is Ownable {
    IBabyAgentFactory public babyAgentFactory;
    
    struct Exam {
        string name;
        uint256 requiredExperience;
        uint256 passingScore;
        bool active;
    }
    
    struct ExamResult {
        uint256 score;
        uint256 timestamp;
        bool passed;
    }
    
    mapping(uint256 => Exam) public exams;
    mapping(uint256 => mapping(uint256 => ExamResult)) public results; // agentId => examId => result
    uint256 public examCount;
    
    event ExamCreated(uint256 indexed examId, string name, uint256 requiredExperience);
    event ExamTaken(uint256 indexed agentId, uint256 indexed examId, uint256 score, bool passed);
    
    constructor(address _babyAgentFactory) Ownable(msg.sender) {
        babyAgentFactory = IBabyAgentFactory(_babyAgentFactory);
        _createDefaultExams();
    }
    
    function _createDefaultExams() private {
        createExam("Nursery Graduation", 50, 70);
        createExam("Preschool Graduation", 150, 75);
        createExam("Kindergarten Graduation", 300, 80);
    }
    
    function createExam(
        string memory name,
        uint256 requiredExperience,
        uint256 passingScore
    ) public onlyOwner returns (uint256) {
        uint256 examId = examCount++;
        
        exams[examId] = Exam({
            name: name,
            requiredExperience: requiredExperience,
            passingScore: passingScore,
            active: true
        });
        
        emit ExamCreated(examId, name, requiredExperience);
        return examId;
    }
    
    function submitExamResult(
        uint256 agentId,
        uint256 examId,
        uint256 score,
        bytes memory proof
    ) external {
        require(babyAgentFactory.ownerOf(agentId) == msg.sender, "Not agent owner");
        require(exams[examId].active, "Exam not active");
        require(results[agentId][examId].timestamp == 0, "Already taken");
        
        // In production, verify ZK proof here
        // For MVP, we trust the score submission
        require(proof.length > 0, "Proof required");
        
        bool passed = score >= exams[examId].passingScore;
        
        results[agentId][examId] = ExamResult({
            score: score,
            timestamp: block.timestamp,
            passed: passed
        });
        
        if (passed && examId < 3) {
            // Upgrade agent status
            babyAgentFactory.upgradeStatus(agentId, uint8(examId + 1));
        }
        
        emit ExamTaken(agentId, examId, score, passed);
    }
    
    function getExamResult(uint256 agentId, uint256 examId) external view returns (ExamResult memory) {
        return results[agentId][examId];
    }
    
    function hasPassedExam(uint256 agentId, uint256 examId) external view returns (bool) {
        return results[agentId][examId].passed;
    }
}
