import { Bytes,Bool, Field, ZkProgram,  Crypto, createForeignCurve, createEcdsa } from 'o1js';
// create a secp256k1 curve from a set of predefined parameters
class Secp256k1 extends createForeignCurve(Crypto.CurveParams.Secp256k1) {}

// create an instance of ECDSA over secp256k1
class Ecdsa extends createEcdsa(Secp256k1) {}
class Bytes32 extends Bytes(32) {}

const ecdsaEthers = ZkProgram({
    name: 'ecdsa-ethers',
    publicInput: Bytes32,
    publicOutput: Bool,
  
    methods: {
      verifyEthers: {

        privateInputs: [Ecdsa, Secp256k1],
        async method(message: Bytes32,signature: Ecdsa, publicKey: Secp256k1) {
            return { publicOutput: signature.verifyEthers(message, publicKey) };      
        },
      },
    },
});




export { Ecdsa, ecdsaEthers,Bytes32,Secp256k1 };




