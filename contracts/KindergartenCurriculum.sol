// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IBabyAgentFactory {
    function ownerOf(uint256 tokenId) external view returns (address);
    function addSkillPoints(uint256 tokenId, uint256 points) external;
}

contract KindergartenCurriculum is Ownable {
    IBabyAgentFactory public babyAgentFactory;
    
    struct Lesson {
        string name;
        string description;
        uint256 difficulty; // 1-10
        uint256 skillReward;
        bool active;
    }
    
    struct Progress {
        uint256[] completedLessons;
        uint256 totalExperience;
        mapping(uint256 => bool) hasCompleted;
    }
    
    mapping(uint256 => Lesson) public lessons;
    mapping(uint256 => Progress) public agentProgress;
    uint256 public lessonCount;
    
    event LessonCreated(uint256 indexed lessonId, string name, uint256 difficulty);
    event LessonCompleted(uint256 indexed agentId, uint256 indexed lessonId, uint256 skillReward);
    
    constructor(address _babyAgentFactory) Ownable(msg.sender) {
        babyAgentFactory = IBabyAgentFactory(_babyAgentFactory);
        _createDefaultLessons();
    }
    
    function _createDefaultLessons() private {
        createLesson("Hello Blockchain", "Learn to read blockchain data", 1, 10);
        createLesson("Signing Practice", "Sign your first transaction", 2, 20);
        createLesson("Token Transfer", "Send tokens safely", 3, 30);
        createLesson("Smart Contract Call", "Interact with contracts", 5, 50);
        createLesson("DeFi Basics", "Understand swaps and liquidity", 7, 70);
    }
    
    function createLesson(
        string memory name,
        string memory description,
        uint256 difficulty,
        uint256 skillReward
    ) public onlyOwner returns (uint256) {
        uint256 lessonId = lessonCount++;
        
        lessons[lessonId] = Lesson({
            name: name,
            description: description,
            difficulty: difficulty,
            skillReward: skillReward,
            active: true
        });
        
        emit LessonCreated(lessonId, name, difficulty);
        return lessonId;
    }
    
    function completeLesson(uint256 agentId, uint256 lessonId) external {
        require(babyAgentFactory.ownerOf(agentId) == msg.sender, "Not agent owner");
        require(lessons[lessonId].active, "Lesson not active");
        require(!agentProgress[agentId].hasCompleted[lessonId], "Already completed");
        
        Progress storage progress = agentProgress[agentId];
        progress.completedLessons.push(lessonId);
        progress.hasCompleted[lessonId] = true;
        progress.totalExperience += lessons[lessonId].skillReward;
        
        babyAgentFactory.addSkillPoints(agentId, lessons[lessonId].skillReward);
        
        emit LessonCompleted(agentId, lessonId, lessons[lessonId].skillReward);
    }
    
    function getAgentProgress(uint256 agentId) external view returns (
        uint256[] memory completedLessons,
        uint256 totalExperience
    ) {
        Progress storage progress = agentProgress[agentId];
        return (progress.completedLessons, progress.totalExperience);
    }
    
    function hasCompletedLesson(uint256 agentId, uint256 lessonId) external view returns (bool) {
        return agentProgress[agentId].hasCompleted[lessonId];
    }
    
    function getLesson(uint256 lessonId) external view returns (Lesson memory) {
        return lessons[lessonId];
    }
}
