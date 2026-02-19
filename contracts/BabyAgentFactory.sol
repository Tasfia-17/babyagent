// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BabyAgentFactory is ERC721, Ownable {
    uint256 private _nextTokenId;
    uint256 public mintPrice = 0.01 ether;
    
    struct BabyAgent {
        string name;
        uint256 birthTime;
        uint8 personality; // 0=curious, 1=shy, 2=bold, 3=silly
        uint256 skillPoints;
        AgentStatus status;
    }
    
    enum AgentStatus { NURSERY, PRESCHOOL, KINDERGARTEN, GRADUATED }
    
    mapping(uint256 => BabyAgent) public agents;
    mapping(address => uint256[]) public ownerAgents;
    
    event BabyBorn(uint256 indexed tokenId, string name, address owner, uint8 personality);
    event AgentUpgraded(uint256 indexed tokenId, AgentStatus newStatus);
    
    constructor() ERC721("BabyAgent", "BABY") Ownable(msg.sender) {}
    
    function mintBabyAgent(string memory name) external payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient payment");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        
        // Generate random personality
        uint8 personality = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId))) % 4);
        
        agents[tokenId] = BabyAgent({
            name: name,
            birthTime: block.timestamp,
            personality: personality,
            skillPoints: 0,
            status: AgentStatus.NURSERY
        });
        
        ownerAgents[msg.sender].push(tokenId);
        
        emit BabyBorn(tokenId, name, msg.sender, personality);
        
        return tokenId;
    }
    
    function getAgent(uint256 tokenId) external view returns (BabyAgent memory) {
        require(_ownerOf(tokenId) != address(0), "Agent does not exist");
        return agents[tokenId];
    }
    
    function getOwnerAgents(address owner) external view returns (uint256[] memory) {
        return ownerAgents[owner];
    }
    
    function upgradeStatus(uint256 tokenId, AgentStatus newStatus) external {
        require(msg.sender == owner() || msg.sender == ownerOf(tokenId), "Not authorized");
        agents[tokenId].status = newStatus;
        emit AgentUpgraded(tokenId, newStatus);
    }
    
    function addSkillPoints(uint256 tokenId, uint256 points) external {
        require(msg.sender == owner(), "Not authorized");
        agents[tokenId].skillPoints += points;
    }
    
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }
}
