// if (typeof web3 !== 'undefined') {
//   const web3 = new Web3(web3.currentProvider);
// } else {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }

// web3.eth.defaultAccount = web3.eth.getAccounts().then(result => {
//   let firstAccount=result[0]
// });

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "voteForCandidate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "Erics",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidateList",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "totalVotesFor",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "validCandidate",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "votesReceived",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

const contractAddress = '0x08970fed061e7747cd9a38d680a601510cb659fb'

const VotingForEricContract = new web3.eth.contract(abi);
const contractInstance = VotingForEricContract.at(contractAddress);

console.log(contractInstance)

const candidates = {"Eric B": "candidate-1", "E B": "candidate-2", "E Boutueil": "candidate-3"}

// function voteForCandidate() {
//   candidateName = $("#candidate").val();
//   contractInstance.voteForCandidate(candidateName, {from: '0x147e02dA5E0691180A3b2C0f2C4381D1fF5F4205'}, function() {
//     let div_id = candidates[candidateName];
//     $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//   });
// }

let candidateName

function totalVotesFor(candidateName) {
  let div_id = candidates[candidateName];
  $("#candidate-" + div_id).html(contractInstance.methods.totalVotesFor(candidateName).send({}).toString());
}

function voteForCandidate(totalVotesFor) {
  candidateName = $("#candidate").val();
  contractInstance.methods.voteForCandidate(candidateName).send({});
  totalVotesFor(candidateName);
}

$(document).ready(function() {
  Erics = Object.keys(candidates);
  for (var i = 0; i < Erics.length; i++) {
    let name = Erics[i];
    let val = contractInstance.methods.totalVotesFor(name).send({}).toString()
    $("#candidate-" + candidates[name]).html(val);
  }
});
