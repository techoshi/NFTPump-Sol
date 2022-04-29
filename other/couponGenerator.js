//npx hardhat run .\other\couponGenerator.js 
const { ethers } = require("hardhat");
const fs = require("fs");

  
const {
    keccak256,
    toBuffer,
    ecsign,
    bufferToHex,
} = require("ethereumjs-utils");

let signerPvtKey1 = '009f83b09a5faf68ce4fe9bed00f026026a3ae3ef59ff13e6a7ec9673bbdb717';

//const signerPvtKey = Buffer.from(signerPvtKey1.substring(2,66), "hex");
const signerPvtKey = Buffer.from(signerPvtKey1, "hex");


let coupons = {};

async function getClaimCodes() {
    //const [owner, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20] = await ethers.getSigners();

    let presaleAddresses = [
        { address : '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', qty : 255},
        { address : '0xf5e3D593FC734b267b313240A0FcE8E0edEBD69a', qty : 8},
        { address : '0xc664F3f1C7170A9C213F56456a83f54E26FF310f', qty : 12},
        { address : '0xf886B127d4E381E7619d2Af1617476fef0d04F8c', qty : 7},
        { address : '0x36Fa3E52D58A7401Be46353F50667FBf931e4F42', qty : 5},
        { address : '0xf886b127d4e381e7619d2af1617476fef0d04f8c', qty : 39},        
        { address : '0xb4e9de72dba27364ca01fb6a8228c2ec89b375a9', qty : 2},
        { address : '0xb15a92224f07e20ac4f4faa81935c2d25db04f1a', qty : 1},
        { address : '0x9538099b353dc72fbec30381ac2f990668b25c32', qty : 1},
        { address : '0xa4ff04972714e5d946d683fe2cac98c78b223a58', qty : 1},
        { address : '0x0e1f362fa853f741ce1b2ded24e4b669e11a13f4', qty : 1},
        { address : '0x51a55d87e4c11c69f325b8ac71bfe1b7ee7c0daa', qty : 1},
        { address : '0x51930785650f1a8732aa308467c8547daf23eeb5', qty : 1},
        { address : '0x6a810b40d762bbf51b0861b42cf89b049fd59776', qty : 1},
        { address : '0x40a9376284ad6dff304173f6dae6b1af5d71bdb5', qty : 1},
        { address : '0xcba7f4f44473e32dd01cd863622b2b8797681955', qty : 4},
        { address : '0x49d62272371bf192fc722aed307c97d00dcc3d30', qty : 6},
        { address : '0xee06a98e0bca3de1678f589e1673b1955594e171', qty : 2},
        { address : '0x9140b21952c63e464702e806fd6a7a533d29ebf8', qty : 2},
        { address : '0x3b8b35d37abc65ccf7c78bd677241870417c8451', qty : 1},
        { address : '0x525831612ab3de971563429d1bd5599224884e65', qty : 1},
        { address : '0x46a73f73ee3b1140ff9618d0704a87ffb8500439', qty : 2},
        { address : '0x68da640489b88108b042e9915b826804862deee8', qty : 1},
        { address : '0x14994df8effc19606648319970b46bd915fcc8bf', qty : 1},
        { address : '0x72846bd895a79eb2c50e9a6d01efdaca134c66f4', qty : 5},
        { address : '0x457cc1a7ff1f8cb0dfc288ebe552be23d0995840', qty : 1},
        { address : '0x36fa3e52d58a7401be46353f50667fbf931e4f42', qty : 17},
        { address : '0x23fea296223e93ea843e229b3d4acc97e77ac7da', qty : 9},
        { address : '0xe259b2f1e9e40bd5be441a8cdd8e26f4287d6936', qty : 1},
        { address : '0x2d84a98248ce384e98882e1330a678b42afa2ee2', qty : 1},
        { address : '0x2e4e508bd88d4fee4a8b8e463a8f13f0734f8225', qty : 8},
        { address : '0x0006103adde348f21840a25ad96557264a793cab', qty : 3},
        { address : '0x15429f1252f28a5a0b81da3b726db353573a7c33', qty : 1},
        { address : '0xd14a5430248c363ce120d10e25c63f26d8fb5c5c', qty : 1},
        { address : '0x5be9597d6d1430d15e4d0086cd30365b7300aab1', qty : 2},
        { address : '0xb3053acc32ae6766696df39234748eecf85e8630', qty : 3},
        { address : '0x2fd0f5baf28223f0bb1168b5b75aeb27dc53966b', qty : 4},
        { address : '0x3e17258a44f938db9803c18c3c762653f5a23e54', qty : 1},
        { address : '0x0eaa53c38ca5a14450803926864503a2ea745feb', qty : 2},
        { address : '0x7ee4b7e11bbd1aedf27f10d5e00c7a831a29d8ad', qty : 1},
        { address : '0xd197d72af51969dcb6bbf59622bea6a6ff6c9b3b', qty : 3},
        { address : '0xc8e6ea8cf43106e2535ff69b50c2ed77acaf3abf', qty : 1},
        { address : '0xec86c2bc516284db752b26e3eed5a8d486e20a8a', qty : 3},
        { address : '0x922adbe7674a364d59ae6e6b449b56899699f101', qty : 3},
        { address : '0x44e14649aec98cc18c640b99c54f64fc638688bd', qty : 3},
        { address : '0x84bc0d8e6da9fea7be9b4690f7960b7f6211b083', qty : 1},
        { address : '0x9cecbdef142f2957d9a60b11366c2db0e795430e', qty : 2},
        { address : '0x27a25e7d890f656cd508173a9e16369b5a29108c', qty : 9},
        { address : '0x56723e85fb64448c4401f1cb03afcd17c89ad187', qty : 1},
        { address : '0xc7b8822e1eead4cd1fb3ae33f34daf694dba6b23', qty : 10},
        { address : '0xdfd15b03e9837af0543f2318348d6dc02de197f2', qty : 2},
        { address : '0x8d58ede331944c51e9fe5c0ab4353a2ae31d5adf', qty : 7},
        { address : '0x335745c105f3a409866ad751070dc9dbeb52058d', qty : 3},
        { address : '0xba7f1ba79e852045529a61d51a305d01194175e5', qty : 3},
        { address : '0xc27f2f8adf67f8bce6b3a1db5192ff3ac845cac0', qty : 2},
        { address : '0x8d2feb13dc1541ba351b0752bd447f55666f544d', qty : 3},
        { address : '0x5f222cab7d41bce0ea427bab05f4e4fa9c43ec67', qty : 1},
        { address : '0xd86c1660640b196c794266189f57fee587849543', qty : 1},
        { address : '0xc9e79db93e099c882f03cdb41950f68dedb88366', qty : 1},
        { address : '0x0abbb0e37358a95c8fe81f0f3fdbe2dd9e358b26', qty : 1},
        { address : '0x49e74e31787734c3543e99bfacd457cb8286b239', qty : 1},
        { address : '0xdf6dc4560be393736063111c2e5a745f6eb70a76', qty : 4},
        { address : '0xdc8454fc7cd769c1d1c40661cd286656e7876bbd', qty : 8},
        { address : '0x3a7243fd7a1925ed2edf75cb0df827c65bdded7d', qty : 5},
        { address : '0x3d773915783f9d4b14e57951d3a7769ad70dc7c2', qty : 3},
        { address : '0x914b3545fac71d70d89cf0709f4e20ebf8d12217', qty : 1},
        { address : '0x173f760f87f6a59a23eb7cd541876fbb752234ff', qty : 1},
        { address : '0x96353d42d88e8a9945cdc8308592f4853f39e114', qty : 2},
        { address : '0x39486db18849bc3ba13edcce4a0be41e04525561', qty : 1},
        { address : '0xe2726637983fc3a95adef14b717278aec01672b4', qty : 1},
        { address : '0x5d2eCEDDc74D1675Ce6934AB364b01799F40F644', qty : 8},
        { address : '0x304eda34b9d964517d05cefea42393c14e655506', qty : 1},
        { address : '0xf2fed62e3b57931ffeb22059d5ccd37f1f007955', qty : 1},
        { address : '0x8451bbbf28da6d1f7ae751dee4a26261e91f44a3', qty : 1},
        { address : '0xece191d2bcb41a9ece649e05ffebfd30f2af5d9b', qty : 4},
        { address : '0xa793ebc07b3c44123933c3e4e2b0a7807fee8257', qty : 2},
        { address : '0xc42b9e7e59275d52a4a2db67026f1869ab06116a', qty : 1},
        { address : '0xd91dad3aa7a78007c03adca808c49020005f79a3', qty : 1},
        { address : '0xe4dcaf06aa77c8264c5b67e0c29a2900e597442e', qty : 1},
        { address : '0x77036302eac1572b3cd6b7e3add6012f60918aab', qty : 3},
        { address : '0x614db52f9ca9a435db5919d118b162b02b24a0a4', qty : 2},
        { address : '0xbe28ec2535c959a2b4e4fdc7e376377aa0c57b43', qty : 14},
        { address : '0x843d74c377e5347a454ba0a6efa75b512ec32d0d', qty : 1},
        { address : '0xd1c282cafb79b503b8904416bdbd3cf2e116c890', qty : 2},
        { address : '0x898e3c496b43b35e95a9610ab3662d173b4d3048', qty : 1},
        { address : '0x5729ea305baba1dd2e00fd55bc305625d058120a', qty : 1},
        { address : '0xdd0f08dad5cb2a920f6f9a72b2d9f44699df3a0a', qty : 4},
        { address : '0xb3a3eed660ea4c43caf8774cfa3e09049c798468', qty : 26},
        { address : '0x206b3256ff1eb827ed5681d9ea45ac04e0bc96d2', qty : 2},
        { address : '0xc61ecc09913be00f9872ef5ae9f411dadb90519c', qty : 1},
        { address : '0x3df2352759f8151b61febe49f4a6b6b0d7d4b30f', qty : 1},
        { address : '0x7ea450b6a576305f47459b146b02ad285ff90dff', qty : 1},
        { address : '0x97d783e5581507429d9a83e3445b31a18df24cb3', qty : 2},
        { address : '0x73da1c2c4709faed6ee7a863ae45af8379fc6fc9', qty : 2},
        { address : '0x3e483f5516564e8078b7108a8fba84762f6eb547', qty : 1},
        { address : '0x24ed47d23dabdebc744e38eb732c471795e2a3f8', qty : 1},
        { address : '0x0c29b6bb73b20ff8a0a01b3fc4b477fcc850c5c9', qty : 1},
        { address : '0x1d5416bb7263f05055e9d2bb8a8b89a7ad99f099', qty : 1},
        { address : '0x68edd95b1861817e173603da9bfe4c900512cbf5', qty : 1},
        { address : '0xef36f4d2a2f04d9284b1758518a9b8c6371accea', qty : 1},
        { address : '0x5d0daafe967033cb5b53442462ef44a2d6dfd37e', qty : 1},
        { address : '0x88ab531687e66eeead077f2085439b50bccf33e4', qty : 3},
        { address : '0xd0a33fca09e6f3923d2420bf57af5c97c13f74d2', qty : 1},
        { address : '0x5cb2306f4a67438aa6d77d5bb6364de21f99cfa8', qty : 1},
        { address : '0x085ee206a33d7958b0f7ff464ff3fe096e868976', qty : 1},
        { address : '0xe5a073f1c75f40c15fdb7e0a90ee05f29e612f11', qty : 1},
        { address : '0x067479168d18e8f5d6e744eac4b38917547c1328', qty : 2},
        { address : '0x57379a7ce1627e4bf622c5872ca7f5d45cc451ac', qty : 2},
        { address : '0x803028dd9d3b5fc1b12e48b4f3f4218cc6470146', qty : 1},
        { address : '0xf2b083eb921a6c65578e941b20680b13d9a10f72', qty : 3},
        { address : '0xc6eae4fb68020c6bac9106cbe6dafc83d2c3da2a', qty : 1},
        { address : '0x83ee2c4637e32bddc8cb65498ed4a7b5fad1c995', qty : 2},
        { address : '0x9ae324f0137840aa22b2135b90f2c28c7ab724ea', qty : 1},
        { address : '0x048c4a9acbb1fe899773dfdd471f002b635bf87c', qty : 2},
        { address : '0x873a577a13b0ba72e44273c01fc370323b6cd981', qty : 1},
        { address : '0x07ba5185a809d7edd6adc9e26d66c94913e3da55', qty : 1},
        { address : '0x73140c714d1262225a92f4afd4ea4a98a42b2c6d', qty : 2},
        { address : '0xd1a4180f7f92a7b39b1eecc7d61e573e965a5cfc', qty : 2},
        { address : '0xca1bcc5afdcc45e87b1b73adcca5863f01c46629', qty : 4},
        { address : '0xe1c2e55e6aca56ea2584868e9434d96a479dd5f9', qty : 1},
        { address : '0x5e070c24af683ef391e93bc161ffb6d2326843b5', qty : 2},
        { address : '0x3f97527ab36f18c48560995448829c161ac6125c', qty : 2},
        { address : '0xca9188a34503ee47cf642d59f5bbb0fc5723e24c', qty : 2},
        { address : '0x3a00b3c58e45f2d5ce8e6929f6d12d792b0c3323', qty : 1},
        { address : '0x59e9582e3b176a63e300c7707dbbf4c58f0480f8', qty : 3},
        { address : '0x1dc6fc17986ad018991adc89aeda01ec1a00e572', qty : 1},
        { address : '0x929013fe1405a7849fe899ff95ec2e9f15b1c182', qty : 1},
        { address : '0xc9618dd60b541494eb36a77450d1be14f9b6d3df', qty : 4},
        { address : '0xf51bfacab04149bfa6c4ca34353a784ac1288582', qty : 8},
        { address : '0xe09bf50f5eb120b4fd298ce99f7a8b9324a0d48c', qty : 1},
        { address : '0xba781db2a3ea4d31d9f75a79722d17262d44aabd', qty : 1},
        { address : '0xdf4fb38f7520ffc9117750d182104bc32d18c464', qty : 1},
        { address : '0x1299640209d012d72c1d996d1aa29554272a0871', qty : 1},
        { address : '0x061d9a3428b35a1f5c821104a391b352bc10764b', qty : 1},
        { address : '0xa752c19a93b612cacf3dbc13d8e5e251ef6f75c1', qty : 1},
        { address : '0x31d6e97282e76450f04e91c13bfc47f1fb27b0b6', qty : 2},
        { address : '0xfcb99fdd5900701b871fca2f2190c3e5de036cb6', qty : 1},
        { address : '0xf26934ff750fd27b7308e18a0220db3d707d0538', qty : 6},
        { address : '0xf5579f958d4091627f4496e240542c4764ac4bc6', qty : 1},
        { address : '0xefc70724a5c6bf5de161a4a5110f7e62b0efccb7', qty : 2},
        { address : '0x2fe50c88f228dacfc24100de0c5167aa7a539dc6', qty : 1},
        { address : '0x764147b036c914ca460dd42494cfa863d3a2c560', qty : 4},
        { address : '0x49b0a81d4d498953fb85db783e780d253f17bfd5', qty : 6},
        { address : '0x1b4b24c91dbaf8b63319104033ef9721dfb6dba5', qty : 1},
        { address : '0x286214ffd959b683e85592394b092d741db55f7d', qty : 1},
        { address : '0x2dfc4b5ec3ad9a1b26f18ef3135d5b0d2313f5e8', qty : 1},
        { address : '0x71a626a950f51806ae8a24833e0dd7c6f51f5725', qty : 2},
        { address : '0xf03d325da6e979c0103b80c7da637098c508c77a', qty : 1},
        { address : '0x4e09378d523e33d2b7487b56e77083e001c1cce1', qty : 1},
        { address : '0xd0120f77911ab47c390151c48ab29c57745bc935', qty : 3},
        { address : '0x4faef2e7a3a7efcbfe72b5b0976945ba2badee17', qty : 3},
        { address : '0x3b369f000408721588929b73063bae20e141bce4', qty : 2},
        { address : '0x145aa63bae11fb69d31697ab72da7d8b4eedb4eb', qty : 1},
        { address : '0xc8a6988aa027c496668a2a8c62219a48e85d5d8b', qty : 2},
        { address : '0xaa88580e65fb09ff45985a174660428879ee4792', qty : 1},
        { address : '0x27e676d87ee3e3510ad9503e6efd1aa987c0b0bf', qty : 3},
        { address : '0x775ab8541adcd2c92f9f076a67a1a420a47beef6', qty : 2},
        { address : '0x1ad92431677dd4bb4da5436ceedaf931ec05ff4a', qty : 1},
        { address : '0x5df9ea6ce30008f24fbf601de094fb468a0c5454', qty : 1},
        { address : '0x3ac4161dc070da4c6734c75538bb6ac64a0f0e63', qty : 4},
        { address : '0xa1a52b431610f6dab79d332e0c88f6bf7fe14aa3', qty : 2},
        { address : '0x7bac6180a72b5de667435adfeb697bfbd15b7dba', qty : 1},
        { address : '0x0ab6cfe285f078d69363cc3cca881689de0fc915', qty : 1},
        { address : '0xcf0149d3bd166f53b2a91765d9fc41d3c4166bab', qty : 2},
        { address : '0x1dbc3d1bd361047a63b9c7a164de393dec95ae05', qty : 1},
        { address : '0x1788b56bfc5b53f88d11369acb482efa9eefd49f', qty : 1},
        { address : '0xe2185a621ab60000dbbd0664366ddbf4c0c1a7ab', qty : 1},
        { address : '0x6ca5b974aa4b7b08ae62699b6cb2a5b8a52c4cdb', qty : 5},
        { address : '0xd0dad92d10c1bc0fb734a37928edfd14810326a4', qty : 1},
        { address : '0x2fa9d8522a36f085acec3ec6087480b8f067d9e7', qty : 2},
        { address : '0x81fe717c7abaeeaf222f8f205a1412539152d4b5', qty : 8},
        { address : '0xbe22a9a72b74bc8fdd7e75aba2cb294a40f87ae1', qty : 1},
        { address : '0x787dbc84ed96180de97bb6f805549dbe603954b2', qty : 1},
        { address : '0x47bFB0ab3c73A70DCB9C0dd061Bf77ac94cF3555', qty : 2},
        { address : '0x1ce9f10a8cd7eea80dd6cb75c18bebd29d7949b9', qty : 1},
        { address : '0x39f455c7c7be89d56b2203d7f210851dd12f6778', qty : 1},
        { address : '0xc31dad2d11b46d7bec14df1ee22ee845f405e203', qty : 4},
        { address : '0xbf8f84e8fa8ff2609792679d8f659fca17c13019', qty : 1},
        { address : '0x8bb79a9d6e28a91b18a7a5bc779097e7356c3f2d', qty : 1},
        { address : '0x80ff3a9e76e68ac8a1cf6ce021574048f835a488', qty : 1},
        { address : '0xad1a05b262dd90e050b7363b08e6bca335d0570f', qty : 2},
        { address : '0x6cf36c20532d521e36308775aea63baf9b3826bd', qty : 1},
        { address : '0x2dcdcafb6cb11544ab93a8985a12448edc37beab', qty : 1},
        { address : '0xd1482b5368ddae4f2dcb19c1ea6f9a20f9230259', qty : 4},
        { address : '0x61c0ad19585e381a89bec8946b150696d1ff08fe', qty : 2},
        { address : '0x04cba99bf19958470d03be77fd1936c1ac73784d', qty : 1},
        { address : '0x267dc343deb9a1677e9e929727a5b8cf3a83a0ca', qty : 1},
        { address : '0x1c29fed7470938f31d21eaccb89ecea1d779684f', qty : 4},
        { address : '0xa646cfa356bd5fe4956519e89821c613161525cf', qty : 4},
        { address : '0x114c6298bea426029e6c1c0ffbc5bbc91f03c5c9', qty : 1},
        { address : '0x4dfd08b2b8ab7c8de88be6de522799b47bd5acb6', qty : 4},
        { address : '0xda979b0d1cbc360ad39c9e6eca44bf545589c426', qty : 1},
        { address : '0x0210798166bc4934ffba40837cad2ff589056ffe', qty : 3},
        { address : '0x699ff4ab000cdd5ff45c8fdc4e65023eea3dc249', qty : 2},
        { address : '0xf9557ef7afb1a5b75c010a5303ec884443978bf2', qty : 2},
        { address : '0x9f128b52128027dd6ea9892f741519979d36fa34', qty : 1},
        { address : '0xcd1f51898f994252e6c39b97dd77642c6b11a164', qty : 1},
        { address : '0xecb25e711a55b4092d6d63d23eec1e6b2687c7cc', qty : 1},
        { address : '0x093cfcde090b214ce48193455d8a71d01870fd7c', qty : 4},
        { address : '0xfa04fcccdc6eacea794aa59f9b0027ab744be3f6', qty : 4},
        { address : '0xaeedfd2d1d4ed180957e522910ded6513bcaff8f', qty : 1},
        { address : '0xe7575b658f1a32e3ed3c333d63f4abd4baddb0e3', qty : 1},
        { address : '0x1dee7a1269bd7245c4fadd2bfa885887a20ec562', qty : 1},
        { address : '0xa1bfaf706d89ae3dc080a7e58b529c091cd5d9f0', qty : 2},
        { address : '0x17621af15febd1eaed91a843b130dbabcaf35d5f', qty : 4},
        { address : '0xbc24ebab7b97375bb039d51add8bed21dad2b891', qty : 1},
        { address : '0x73631e3773a9b47f453543d013e8f97fb926b101', qty : 1},
        { address : '0x7305ce3a245168ddc87c3009f0b4b719bc4519f5', qty : 1},
        { address : '0x288ec12df523fb9c5d980d069746ba51886f93b6', qty : 1},
        { address : '0xb917c85e98a7d3c0d55dfdbf820bac80c18c97d9', qty : 1},
        { address : '0x5ce87d185c7ea4e7e88eb505adcbe3d5afa61457', qty : 5},
        { address : '0x8755a631717f786fc18c4f46f0e27cf2d5d6463a', qty : 1},
        { address : '0x779f5140a0bfcc004249662abf35a474a2f1715e', qty : 3},
        { address : '0x12399b7e861cc5fbb95f2c56a8c67e8515fdfb92', qty : 1},
        { address : '0x16629d071faf4a42d616829bc5d15ebbd7d98075', qty : 1},
        { address : '0xbbd815335ea8ddfa9bc1766cd06f64050d409b52', qty : 1},
        { address : '0x011aab6cc97b98a546529072ce235f1752750319', qty : 1},
        { address : '0xb0cfda9562b62f57db886a1c7102cfb13b157597', qty : 1},
        { address : '0x527d0169620a41fb9de8636f8db41811fb165e40', qty : 4},
        { address : '0xbc52466363f670385e61cd81bc79a74edb14b5b8', qty : 2},
        { address : '0x6a8f56c9fa5c22dbbb90987b626dfe38a841e732', qty : 2},
        { address : '0x7333a4e17bfb28931efd8650a70aa9358e41b743', qty : 1},
        { address : '0x49acafef796b21c064d267d777d9753918959b50', qty : 1},
        { address : '0x278aa5e5cd4c424ddddea3f583822af9fecceb27', qty : 2},
        { address : '0x31ad74365e6190e608d053670e65ed35ff6337fb', qty : 1},
        { address : '0x20ee31efb8e96d346ceb065b993494d136368e96', qty : 3},
        { address : '0x07a2172cd0154056f6261334a413fab1450be85f', qty : 1},
        { address : '0x60213d4293c7fc4572be3102422f3441358eb4bb', qty : 1},
        { address : '0xb76ad07cd32709935d860cf5041818739967ab94', qty : 3},
        { address : '0x61153bd69aa4abba80dd5783f111d749b0e56c34', qty : 1},
        { address : '0xe0c45e5d67c07528fce6a38bf1907ef4a856e91e', qty : 1},
        { address : '0xf92ad0c97d3587baaedc2ba169498b70821ff061', qty : 3},
        { address : '0x533ff67d190ffd0664b6ec6b9279b7c2594ef4a3', qty : 2},
        { address : '0xb6bf6cf3d9fe51e8bfe719a9916ecfc7d6d70a98', qty : 1},
        { address : '0xadc90d9af22d656390e3d9b954f71bb22c6b4dec', qty : 8},
        { address : '0x4e99f0792ef11a99dea16825b5cbbed69eb3d81d', qty : 2},
        { address : '0x4331e0f6b55d266abe5963b19abd4ec4ce3bafe3', qty : 2},
        { address : '0x30a8e38fbd9e778ddac2a4a02cd8129bb50bba8a', qty : 2},
        { address : '0x1421ab7e41fd553122f868e70abd57567c2a19fb', qty : 1},
        { address : '0x7e9e46d0bb5a31c56ed1adbadf42d9f021676a42', qty : 1},
        { address : '0x48ced19d2fe89909031003f7b42d69afb9e9e1e2', qty : 1},
        { address : '0x9e64542f7ad483aedd9e4253e718ce14dc97d25f', qty : 1},
        { address : '0xf35e2163862b4913eea961fc118c435e7401bf05', qty : 1},
        { address : '0x5a1bd9dcf079d07e6ae02cba6818c2520226eb53', qty : 1},
        { address : '0xdc8236bc75f3ce209ea4da4f3d7f3045ab32ec69', qty : 1},
        { address : '0x8451164f62cd1ab92c5ff6f0ef764559632b2500', qty : 1},
        { address : '0x690cce1149296a0114ab79f1113b59ff6d8ca511', qty : 3},
        { address : '0x7fe436a07e3f8a2b888b8a54ff633030a2611085', qty : 1},
        { address : '0xbfec2718b19f4450cf8b3da2395b71f9b9af28c3', qty : 1},
        { address : '0xfa39bfdcd939eec27025622ef32cf9bae44d6819', qty : 1},
        { address : '0x41395e85ef59edd53b804d37a40faa45f7512399', qty : 2},
        { address : '0xee5280e9eb7b9d33ca03332db7382b24f4a2d009', qty : 1},
        { address : '0xa3b9108185ac1356b4c88c4aabfed1a109210d38', qty : 10},
        { address : '0xcd43adcb61949ab14d3f4574bfbda53d46389715', qty : 2},
        { address : '0x440aaa3ad39b0006bc9dfae21b2ff9b124e73fa6', qty : 1},
        { address : '0x923cc95fcd173054a0f99a46e8be881fead7ef14', qty : 1},
        { address : '0x9a3110f65ef679dcdc8ff5cae2604e1f571ae76d', qty : 2},
        { address : '0xa89c2fe00d85eac806c594e4575b170e999d8562', qty : 1},
        { address : '0xb3733d5bb0f08f89d8ce1fdd186ce8a9019326ab', qty : 1},
        { address : '0x7198cf986e2f0752a8fffa82a31589d1d35e6d6a', qty : 1},
        { address : '0x6133a49f0a63c77e639e73206295304fe64b3a40', qty : 1},
        { address : '0x726a614c9252f4203941669d853028784e3ff887', qty : 1},
        { address : '0xdbc5a2c5c88f79f7e134c2d33dc0e61d97ce73f3', qty : 3},
        { address : '0x6b81475057b17ae2838c1654adbe40ca7c08bba8', qty : 2},
        { address : '0xa2d4e06a6922191a0793880ebbfb5d40edc55654', qty : 1},
        { address : '0x4cc1597b7f8f707e6a7aa8e4f4fa94dd88c3d383', qty : 2},
        { address : '0xc212fa2b9c4e07548d8e2809612063d38d168495', qty : 1},
        { address : '0x10d210fdafd37401179cd136552010ef856c2970', qty : 1},
        { address : '0x81c257f559196ae212776c47044dd082858a11da', qty : 1},
        { address : '0x3e5d041b1acb6d95230423e5ea62a206c8e4f550', qty : 1},
        { address : '0x538cf264522fe642374ccec7cef0ab72d8f0ee61', qty : 1},
        { address : '0x20b4c8fd55cfdd05c6288b35cb796a2fbdf6031f', qty : 1},
        { address : '0x620746ffb16f39668d804e5065958dd92cd42b4b', qty : 2},
        { address : '0xdff6b88d0372d71288103f3ac0a91a211a413794', qty : 1},
        { address : '0x46797eab11aae32e2aa4c5058f71b072cde48dfa', qty : 2},
        { address : '0xb5c85cbfc3773f1648acda225e338762ca09981f', qty : 1},
        { address : '0x625d97a57ac5fc4f3c95cc4896728ab7664711a8', qty : 2},
        { address : '0xff88bd69dc4d42b292b4acade8e24a20979c0098', qty : 1},
        { address : '0x33b9ef82c39fe541cc230943fa2a27f1ec9c20a7', qty : 2},
        { address : '0xe5c21e0c5411f1aef45c9b2dde7ea242e16b0a64', qty : 2},
        { address : '0xf641e2800a94b49b8b428353ea71aae85865dece', qty : 2},
        { address : '0x00200fd8210fed9e4131cc25f347da849cb1dfa2', qty : 1},
        { address : '0x4268dd3030ca01c141801226073fc688bd406074', qty : 1},
        { address : '0x0ecd124cb954a6b3454237fd304dbf44d0fc0ac4', qty : 1},
        { address : '0x3ab7aa2799d3bc7038852674fd7d153051b5dc09', qty : 1},
        { address : '0xff2450085510b5eb86c7f9451d5fbc0ca5a793aa', qty : 4},
        { address : '0x6eaacf7cad57725adcc185a879b7241ff33547da', qty : 4},
        { address : '0x4c8e53c16acfbd4759caf96b3d55c3141e293a73', qty : 1},
        { address : '0xd2e31eb9cc0e357b510f67c021ba716412c54806', qty : 1},
        { address : '0x75960983fe3da263fa69f7035953337fd678e537', qty : 3},
        { address : '0x0092477b8acb3ac744bee3408b0c91c0ab5f9b70', qty : 1},
        { address : '0xe525a8ec70869d9bd084344e318c99ad43e62f8e', qty : 1},
        { address : '0x72be2f95e74b0699fd09f3b9a7f7b587b4ffdf62', qty : 1},
        { address : '0x6e366d245eaf19e77aaa0c013aaa9ff557f4859d', qty : 2},
        { address : '0xec641c2181b6a3b9f202645eb56adc652f4563bd', qty : 1},
        { address : '0xdcb7452f9edc804fdbec6fcdd87b8d932171cb10', qty : 1},
        { address : '0x396f18ddc7587487d76286a2df224691d4d9157d', qty : 2},
        { address : '0x321fdfcf79eeaed39fc67daaca07d92457129d4f', qty : 1},
        { address : '0xc6ddd3e9e2debb5247877fc16160963682b6d1b3', qty : 1},
        { address : '0x782864f786b95c4731ef8c015c729454703a6548', qty : 1},
        { address : '0xa1fea0555e07d2cb15188c77a64d1f864dab3c36', qty : 1},
        { address : '0xa287f3a538efa46ac5a6e2542e45f4821fc71d8a', qty : 1},
        { address : '0x849fc8d14979b3525f00d022dd1a600ed45fed23', qty : 1},
        { address : '0xf60ad3e38f47861cbd22a2ea1a8e37b07205b1b9', qty : 1},
        { address : '0x2905efe401f9c1917cb0da778d382407982e8cc4', qty : 1},
        { address : '0x456f4112283c035483a9dc71d1c8275b08fd2ca5', qty : 2},
        { address : '0xcf4f1487f0a8922f07694336ff48831ae91675a1', qty : 2},
        { address : '0xed051fe098f973c518c7bef3325e3a890b1a2237', qty : 1},
        { address : '0x0ed03bbfb0ce0b040e21a4048798884f347c189a', qty : 1},
        { address : '0x2e9fc7c2e2cb58ad3888ff0695a2fb7de390ea0c', qty : 1},
        { address : '0x3fb0e2c4669771b86a9d985ee17172ef0671ecff', qty : 1},
        { address : '0x59bafc92a783469e22ee54bb1be5af362b0bbe96', qty : 1},
        { address : '0xa544526596b786a2cdb3683f76827feacc48871e', qty : 1},
        { address : '0xfac01b5c4b2f4eb0ea16e795f4e958e0a107e981', qty : 2},
        { address : '0x5cfd4ba48829030c0f79103e69dfbfa140d5385b', qty : 1},
        { address : '0xd6ab8a075c2a73977d1d5fc88130aad0d205e6ba', qty : 1},
        { address : '0x86b25201f5bacf97768a67363db4851e3a25f1d1', qty : 2},
        { address : '0x0a76ff4f6ea03c33c13ed12aeaf1fa8b4d55dda4', qty : 1},
        { address : '0xc4cd6715deb79d19506d8f5324ef90353f9cfcfe', qty : 2},
        { address : '0x7983f91136900a15a9cb19088e98bc6f28dc8d53', qty : 1},
        { address : '0x00f9ea2bbfd6b4e42ffb7d9ccd4cc81106cd67e0', qty : 1},
        { address : '0x45e84638f3e55624f7cdf072a96bd7d9c8095fee', qty : 1},
        { address : '0x80b23763eca1f65d7db24b52d6c8f69424b6f35c', qty : 1},
        { address : '0x146f9cb077b08b963b89bc4285f60945a44d3df3', qty : 1},
        { address : '0xdb9a265404bf18a0ab168289cab27e1177cfa805', qty : 1},
        { address : '0xdefeb216b1171bb92e5761c71e9009a7b8b2ba73', qty : 1},
        { address : '0xc3dbf39d0cc4dc863b1ce460b09c9793874a003b', qty : 3},
        { address : '0xf804b72495c2e7b6da1c10665c00627772ea02ca', qty : 1},
        { address : '0x88E952414f612cBd45e650Fdbd51a76D9Ec49CA4', qty : 5},
        { address : '0x34de694308D4Bb72C53be577E3110F345E05F087', qty : 5},
        { address : '0x9EF4c075E19ed467813aCA21A23c6aF309B6D236', qty : 10},
        { address : '0x83cd9d472a57f26d9727ce58fb59959103fa2586', qty : 1},
        { address : '0x440d3d87ff9911cd085189ad04c4e1d6cfe97d0a', qty : 1},
        { address : '0xb56e73cf3a6464eea74b54e58212800f7a7aca6a', qty : 2},
        { address : '0x51ccf2a1959e0e8adfccb33bf39b77d816d790d0', qty : 1},
        { address : '0x6d4c40563cb0d7c69fef684577eab9cd1ce539a1', qty : 1},
        { address : '0x1445fd6971b747cf72b0d4035af61078a14dba3a', qty : 2},
        { address : '0xd96162536ac924b86f267f0ee6020dcbb7bae309', qty : 1},
        { address : '0x6727172b265998f7a8aae3ef73cc0d62b8dfe289', qty : 3},
        { address : '0xbb39f11f03db6a4bceb57ceec98e3b2696574103', qty : 5},
        { address : '0x835712ccf9a6b0af03cc89cff9726b2d92bbb778', qty : 1},
        { address : '0x15301186cb0dc8db94a381afe51d9dee16825cb9', qty : 1},
        { address : '0x79d3c7fa7c6eb2a369cf18bb3bc3eaf1a43b0bd1', qty : 1},
        { address : '0x20298beb0993b91c207cc2b17df146d20c95e265', qty : 1},
        { address : '0x09382e9bbdf4a47d48d83d56857704cf6fab1f82', qty : 1},
        { address : '0x73c3690487abdc7ac53be5ed49be89b9726ad5d8', qty : 1},
        { address : '0x3aaf6b43f0a95ce8161021b1aab903af1428cdd7', qty : 2},
        { address : '0x8bf0abe4426bd97886810b9d9774f69970406dbc', qty : 1},
        { address : '0x896f82abaa0aaeb70124218b035440723e4fe8ef', qty : 1},
        { address : '0x2e612055c8a3d21ee9fd1ed385d01b34190f7e80', qty : 2},
        { address : '0xb6a8165c9910c8e9afadc9550a3f13c1ffd1484b', qty : 1},
        { address : '0x2fa88ce39a354be59314be2a7ec4813ba3aa12a1', qty : 1},
        { address : '0xb0bc53ea9ad2ad26019e158a1ff121a3ce8b3c43', qty : 1},
        { address : '0xf47ea51545bbf8f25bcd36dd74e5b64a973fa546', qty : 1},
        { address : '0x320fa73fba025c0897df37f3d2c458e63a591c9f', qty : 1},
        { address : '0xec7f07aa8c178361a97ddc6ed2daccf1eee4d595', qty : 1},
        { address : '0xbea2bde77dded2336fa2a86bcf0e2a5b167ec67e', qty : 1},
        { address : '0x5c4c02b58b57f88f8c6ca27c62d5a4d682f4592e', qty : 1},
        { address : '0x6794f99284b7b6b68256b43b6a90290d4da5b608', qty : 1},
        { address : '0x48c61d3ab04537448a16f52cf508bc0dd71316b5', qty : 1},
        { address : '0xf824a15083bbbf03568a3f5735f1f6d8772fb012', qty : 1},
        { address : '0xb81f775c68fc9c33e5cc1cf277399824a64f3e85', qty : 1},
        { address : '0xdd4cb3efed6091a4d5dc5693c6ab15efa4c2de3f', qty : 1},
        { address : '0x352f97f2029b806087e17745184de4d27ed0f138', qty : 1},
        { address : '0x845d50632a95e4f63ea998b422230e4d3be4bc6f', qty : 1},
        { address : '0xbfad68d0e6fc4e988847f10a93ad40e58863115b', qty : 1},
        { address : '0x4b9925e2d37fdf06c607b113c309ce14746e9312', qty : 1},
        { address : '0x1200a40c18804f6b5e01f465d5489e53340d61ec', qty : 1},
        { address : '0xeb10a955cfd0c9b9f192b0d0d820158dec8ffd7f', qty : 1},
        { address : '0xce251ad55a4436dc0ada72276f41454350d4959c', qty : 2},
        { address : '0x81ce304a9e7d9350325079adc2f44a6c1f89d090', qty : 1},
        { address : '0x09b5859c61472225eea395b1aa31e2cd976d34a3', qty : 1},
        { address : '0xe4b3c5b6d5bcc22b00c628a8bb27e98207d92199', qty : 1},
        { address : '0xf0fb0c352273c135349c800ef6f3606d2d24b537', qty : 2},
        { address : '0xe80400a17b6d3ca21a5064d52fd76f55252bd9fb', qty : 1},
        { address : '0xade11f3fc3cbe67a57c9a2ba66ab01178467c4ce', qty : 1},
        { address : '0xdae01802a31548c21a32fa776bcdfe0462273d4f', qty : 1},
        { address : '0xd58e18e0a0ed707e3266d6a24e3126f446fa661d', qty : 1},
        { address : '0x27eb8f2dd99c5081ebcb7987d98e9a7df559049c', qty : 2},
        { address : '0xadcdfd5e46f7ea9f6c33c67af467efc322e799e4', qty : 2},
        { address : '0x6a5c570713d19fcb0cef2389c173860255c323ea', qty : 1},
        { address : '0x7e338b8c2bd6f72f8d4c38737df0ae2135a235f1', qty : 2},
        { address : '0xec23ebd82b7fa549381dff3c803ba3e9364d3f2d', qty : 1},
        { address : '0x9673153e43ecb24a0eeac5ff760d3b14f0afaaae', qty : 1},
        { address : '0x689ef466def988f57f057128e5b97f6e78ac08fc', qty : 1},
        { address : '0x6d424cd4ea7f54eb0b21f34844ef820efa091b09', qty : 1},
        { address : '0xe36067a4c51ff6cb7fb6f97d1931bb27a468960b', qty : 1},
        { address : '0x89e1b5691996adc002224f862dc4ad3b02bd816f', qty : 3},
        { address : '0x11aDCA99FD220f7E26772E39ed8DF535E4A58721', qty : 3},
        { address : '0x32FB6ACa62bFD1348ea07aeacee7729d63430e42', qty : 2},
        { address : '0xdc294D7C1C2Fa27ee7E06e5D0B964Eee54815376', qty : 1},
        { address : '0x6d10ab9b038122124de213a2ba8c9e6234ff3d4c', qty : 1},
        { address : '0x2f763b30738e21a84507b86ce71c17107c431621', qty : 1},
        { address : '0xA6e51445fe6C4822Ac9E8C9223C54572cAEc5CC2', qty : 1},
        { address : '0x10C8C3B98f06750965D2e509778c193EB747cf84', qty : 1},
        { address : '0xc664F3f1C7170A9C213F56456a83f54E26FF310f', qty : 10},
        { address : '0xDc5403A94EF5069bFfD5F11306baace7974c3C76', qty : 1}       
    ]      
    
    function createCoupon(hash, signerPvtKey) {
        return ecsign(hash, signerPvtKey);
    }
    
    function generateHashBuffer(typesArray, valueArray) {
        return keccak256(
            toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
                valueArray))
        );
    }

    function serializeCoupon(coupon) {
        return {
            r: bufferToHex(coupon.r),
            s: bufferToHex(coupon.s),
            v: coupon.v
        };
    }

    for (let i = 0; i < presaleAddresses.length; i++) {
        const userAddress = ethers.utils.getAddress(presaleAddresses[i].address);
        const hashBuffer = generateHashBuffer(
            ["uint256", "address"],
            [presaleAddresses[i].qty, userAddress]
        );
        const coupon = createCoupon(hashBuffer, signerPvtKey);

        coupons[userAddress] = {
            q : presaleAddresses[i].qty,
            whitelistClaimPass: serializeCoupon(coupon)
        };
    }
    // HELPER FUNCTIONS
    
    // get the Console class
    const { Console } = require("console");
    // get fs module for creating write streams
    const fs = require("fs");

    // make a new logger
    const myLogger = new Console({
    stdout: fs.createWriteStream("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266-signed-coupons.txt"),
    stderr: fs.createWriteStream("errStdErr.txt"),
    });

    myLogger.log(coupons);
   
}

getClaimCodes()