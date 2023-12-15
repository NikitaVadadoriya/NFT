require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

//console.log(JSON.stringify(contract.abi));

const contractAddress = "0xAA47529EB60a75A62349Eec52EAb9200cEC78C88";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

//create transaction
async function mintNFTWithRoyalty(tokenURI, royaltyReceiver, feeNumerator) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .mintNFTWithRoyalty(
        PUBLIC_KEY,
        tokenURI,
        royaltyReceiver,
        feeNumerator
      )
      .encodeABI(),
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        } 
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFTWithRoyalty(
  "https://gateway.pinata.cloud/ipfs/QmYXULeU8f2wEAunqhYKjLLtdPRne7peUgV3dEpTNC8Zpm",
  "0x191B09FD7b7DCeB732921eDecA40d805B42240F7",
   10
);