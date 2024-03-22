// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NEXA is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public gas = 0.1 ether;
    uint256 public price = 0.1 ether;

    struct Institution {
        string name;
        string username;
        string email;
        bool isValidated;
        address[] students;
    }

    struct Student {
        string name;
        string username;
        string email;
        address[] institutions;
    }

    mapping(address => Institution) public institutions;
    mapping(address => Student) public students;

    mapping(string => address) private institutionUsernameToAddress;
    mapping(string => address) private studentUsernameToAddress;

    constructor() ERC721("NEXA", "NX") Ownable(msg.sender) {}

    event InstitutionRegistered(
        address indexed institutionAddress,
        string name,
        string username,
        string email
    );
    event StudentAddedToInstitution(
        address indexed institutionAddress,
        address indexed studentAddress
    );

    event StudentRegistered(
        address indexed studentAddress,
        string name,
        string username,
        string email
    );
    event InstitutionAddedToStudent(
        address indexed institutionAddress,
        address indexed studentAddress
    );

    function safeMint(
        address studentAddress,
        string memory uri
    ) external payable {
        require(msg.value >= gas + price, "Insufficient ether sent");
        require(
            institutions[msg.sender].isValidated,
            "Only validated institutions can mint"
        );

        require(
            bytes(students[studentAddress].username).length > 0,
            "Student not registered"
        );
        require(bytes(uri).length > 0, "Invalid token URI");

        uint256 tokenId = totalSupply() + 1;
        _safeMint(studentAddress, tokenId);
        _setTokenURI(tokenId, uri);

        _addStudentToInstitution(studentAddress);
        _addInstitutionToStudent(studentAddress);
    }

    function getAllURIsOfOwner(
        address owner
    ) external view returns (string[] memory) {
        require(owner != address(0), "Owner address must not be empty");
        uint256 tokenCount = balanceOf(owner);
        string[] memory uris = new string[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            uris[i] = tokenURI(tokenId);
        }
        return uris;
    }

    function isStudent(address account) public view returns (bool) {
        return bytes(students[account].username).length > 0;
    }

    function isInstitution(address account) public view returns (bool) {
        return bytes(institutions[account].username).length > 0;
    }

    //Institution Functons --------------------------------------

    function registerInstitution(
        string memory name,
        string memory username,
        string memory email,
        bool isValidated
    ) external payable {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(username).length > 0, "Username cannot be empty");
        require(
            institutionUsernameToAddress[username] == address(0),
            "Username is already in use"
        );
        require(
            bytes(institutions[msg.sender].username).length == 0,
            "Institution already registered"
        );

        institutions[msg.sender] = Institution(
            name,
            username,
            email,
            isValidated,
            new address[](0)
        );
        institutionUsernameToAddress[username] = msg.sender;

        emit InstitutionRegistered(msg.sender, name, username, email);
    }

    function getInstitutionByUsername(
        string memory username
    ) external view returns (address) {
        require(bytes(username).length > 0, "Username must not be empty");
        return institutionUsernameToAddress[username];
    }

    function updateInstitutionInfo(
        string memory name,
        string memory newUsername,
        string memory email
    ) external payable {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(newUsername).length > 0, "New username cannot be empty");
        require(
            bytes(institutions[msg.sender].username).length > 0,
            "Institution not registered"
        );

        if (
            keccak256(abi.encodePacked(newUsername)) !=
            keccak256(abi.encodePacked(institutions[msg.sender].username))
        ) {
            require(
                institutionUsernameToAddress[newUsername] == address(0),
                "New username is already in use"
            );
            institutionUsernameToAddress[
                institutions[msg.sender].username
            ] = address(0);
            institutionUsernameToAddress[newUsername] = msg.sender;
        }

        institutions[msg.sender].name = name;
        institutions[msg.sender].email = email;
        institutions[msg.sender].username = newUsername;
    }

    function _addStudentToInstitution(address studentAddress) internal {
        institutions[msg.sender].students.push(studentAddress);
        emit StudentAddedToInstitution(msg.sender, studentAddress);
    }

    function _addInstitutionToStudent(address studentAddress) internal {
        students[studentAddress].institutions.push(msg.sender);
        emit InstitutionAddedToStudent(msg.sender, studentAddress);
    }

    function getStudentsOfInstitution(
        address institutionAddress
    ) external view returns (address[] memory) {
        return institutions[institutionAddress].students;
    }

    // Student Functions ---------------------------------------------------------------------------------------

    function registerStudent(
        string memory name,
        string memory username,
        string memory email
    ) external payable {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(username).length > 0, "Username cannot be empty");

        require(
            studentUsernameToAddress[username] == address(0),
            "Username is already in use"
        );
        require(
            bytes(students[msg.sender].username).length == 0,
            "Student already registered"
        );

        students[msg.sender] = Student(name, username, email, new address[](0));
        studentUsernameToAddress[username] = msg.sender;

        emit StudentRegistered(msg.sender, name, username, email);
    }

    function updateStudentInfo(
        string memory name,
        string memory newUsername,
        string memory email
    ) external payable {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(newUsername).length > 0, "New username cannot be empty");
        require(
            bytes(students[msg.sender].username).length > 0,
            "Student not registered"
        );

        if (
            keccak256(abi.encodePacked(newUsername)) !=
            keccak256(abi.encodePacked(students[msg.sender].username))
        ) {
            require(
                studentUsernameToAddress[newUsername] == address(0),
                "New username is already in use"
            );
            studentUsernameToAddress[students[msg.sender].username] = address(
                0
            );
            studentUsernameToAddress[newUsername] = msg.sender;
        }

        students[msg.sender].name = name;
        students[msg.sender].email = email;
        students[msg.sender].username = newUsername;
    }

    function getInstitutionsOfStudent(
        address studentAddress
    ) external view returns (address[] memory) {
        return students[studentAddress].institutions;
    }

    //Owner functions ------------------------------------------------------------------

    function validateInstitution(
        address institutionAddress
    ) external onlyOwner {
        institutions[institutionAddress].isValidated = true;
    }

    function removeInstitution(address institutionAddress) external onlyOwner {
        delete institutions[institutionAddress];
    }

    function setGas(uint256 _gas) external onlyOwner {
        gas = _gas;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    //Other functions ------------------------------------------------------------

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
