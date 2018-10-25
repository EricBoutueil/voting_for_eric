// window.addEventListener('load', function() { // Error "web3 is not defined" if included

  if (typeof web3 !== 'undefined') { // tried with window.web3, with and without load event listener
    var web3 = new Web3(web3.currentProvider);
  } else {
    console.log("MetaMask is NOT working (properly)")
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  startApp()

// })

function startApp() {
  // web3.eth.defaultAccount = web3.eth.getAccounts().then(result => {
  //   var firstAccount=result[0]
  // });

  var contractAddress = '0xfea09a7c6f6e923b1bda343fdc0eddbe0de9618c'

  // var contractInstance = new web3.eth.Contract(voting_for_eric_abi, contractAddress); // web3.eth.Contract is not a constructor
  var contractInstance = new web3.eth.contract(voting_for_eric_abi, contractAddress);
  // var VotingForEricContract = web3.eth.contract(voting_for_eric_abi);
  // var contractInstance = VotingForEricContract.at(contractAddress);

  console.log(contractInstance)

  var candidates = {"Eric B": "candidate-1", "Eric Boutueil": "candidate-2", "E Boutueil": "candidate-3"}
  // var candidates = {"0x457269632042": "candidate-1", "0x4572696320426f75747565696c": "candidate-2", "0x4520426f75747565696c": "candidate-3"}

  function voteForCandidate() {
    var candidateName = $("#candidate").val();
    contractInstance.voteForCandidate(candidateName, {from: '0x93f07a160eBAc98A5f1Ee420A9E6970DA0A48E95'}, function() {
      var div_id = candidates[candidateName];
      $("#candidate-" + div_id).html(contractInstance.methods.totalVotesFor(candidateName).call().toString());
    });
  }


  $(document).ready(function() {
    Erics = Object.keys(candidates);
    for (var i = 0; i < Erics.length; i++) {
      var name = Erics[i];
      var val = contractInstance.methods.totalVotesFor(name).call().toString()
      $("#candidate-" + candidates[name]).html(val);
    }
  });
}
