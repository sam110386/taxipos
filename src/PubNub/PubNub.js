import PubNub from "pubnub";
//'subscribe_key' => 'sub-c-1013cf94-515f-11e4-a551-02ee2ddab7fe',
//            'publish_key' => 'pub-c-1686ff1d-9b41-4cf8-87f5-d9d504ec2343',
//            'secret_key' => 'sec-c-Mzc4ZjJlZmEtZDBkNy00MDJiLTg5ZWMtYTJhYzc2ODk5NTMz',
function pubNub() {
    const pubnub = new PubNub({
        subscribeKey: "sub-c-1013cf94-515f-11e4-a551-02ee2ddab7fe",
        publishKey: "pub-c-1686ff1d-9b41-4cf8-87f5-d9d504ec2343",
        secretkey:"sec-c-Mzc4ZjJlZmEtZDBkNy00MDJiLTg5ZWMtYTJhYzc2ODk5NTMz"
      });
      return pubnub
}

export default pubNub