import PubNub from "pubnub";

function pubNub() {
    const pubnub = new PubNub({
        subscribeKey: "sub-c-1013cf94-515f-11e4-a551-02ee2ddab7fe",
        publishKey: "pub-c-1686ff1d-9b41-4cf8-87f5-d9d504ec2343"
      });
      return pubnub
}

export default pubNub