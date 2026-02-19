// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISkillExamVerifier {
    function hasPassedExam(uint256 agentId, uint256 examId) external view returns (bool);
}

contract DiplomaNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    
    ISkillExamVerifier public examVerifier;
    
    struct Diploma {
        uint256 agentId;
        uint256 graduationDate;
        string[] skills;
        uint256 finalScore;
        string ipfsHash;
    }
    
    mapping(uint256 => Diploma) public diplomas;
    mapping(uint256 => uint256) public agentToDiploma; // agentId => diplomaId
    
    event DiplomaIssued(uint256 indexed diplomaId, uint256 indexed agentId, uint256 graduationDate);
    
    constructor(address _examVerifier) ERC721("Agent Kindergarten Diploma", "DIPLOMA") Ownable(msg.sender) {
        examVerifier = ISkillExamVerifier(_examVerifier);
    }
    
    function issueDiploma(
        uint256 agentId,
        address agentOwner,
        string[] memory skills,
        uint256 finalScore,
        string memory ipfsHash
    ) external onlyOwner returns (uint256) {
        require(agentToDiploma[agentId] == 0, "Diploma already issued");
        require(examVerifier.hasPassedExam(agentId, 2), "Must pass final exam");
        
        uint256 diplomaId = _nextTokenId++;
        _safeMint(agentOwner, diplomaId);
        
        diplomas[diplomaId] = Diploma({
            agentId: agentId,
            graduationDate: block.timestamp,
            skills: skills,
            finalScore: finalScore,
            ipfsHash: ipfsHash
        });
        
        agentToDiploma[agentId] = diplomaId;
        
        emit DiplomaIssued(diplomaId, agentId, block.timestamp);
        
        return diplomaId;
    }
    
    function getDiploma(uint256 diplomaId) external view returns (Diploma memory) {
        require(_ownerOf(diplomaId) != address(0), "Diploma does not exist");
        return diplomas[diplomaId];
    }
    
    function getAgentDiploma(uint256 agentId) external view returns (uint256) {
        return agentToDiploma[agentId];
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Diploma does not exist");
        
        Diploma memory diploma = diplomas[tokenId];
        if (bytes(diploma.ipfsHash).length > 0) {
            return string(abi.encodePacked("ipfs://", diploma.ipfsHash));
        }
        
        return super.tokenURI(tokenId);
    }
}
