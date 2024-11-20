import { Bytes32, Ecdsa, ecdsaEthers, Secp256k1 } from './ethAddress';
import  {Wallet, } from 'ethers'

describe('ethAddress.js', () => {
  describe('ethAddress()', () => {
    
    beforeAll(async () => {
      await ecdsaEthers.compile();
    })

    it('Should return the correct timestamp', () => {
        var now = 1732035131151
        var result = Bytes32.fromString(now.toString());

        var decodedValue = new TextDecoder().decode(result.toBytes())  
        // console.log(`
        //   Input: ${now.toString()} 
        //   Result Uint8Array : ${result.toBytes()}      
        //   Result hex : ${result.toHex()}
        //   Decode to String: ${decodedValue}   `); 
          
        expect( decodedValue.includes(now.toString())   ).toBeTruthy()

    });

    it('Should return the correct timestamp',async () => {
      var now = new Date().getTime();
      const wallet = Wallet.createRandom();
      const walletPublicKey = wallet.publicKey;
      const signature = await wallet.signMessage(now.toString());
      const msgBytes = Bytes32.fromString(now.toString());

      const publicKeyE = Secp256k1.fromEthers(walletPublicKey);
      const signatureE = Ecdsa.fromHex(signature);

      let { proof: proofE } = await ecdsaEthers.verifyEthers(
        msgBytes,
        signatureE,
        publicKeyE
      );

      expect(await ecdsaEthers.verify(proofE)).toBeTruthy();
      
    })



  

  });
});
