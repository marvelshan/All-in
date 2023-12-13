import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAVLJTHKBVZ76XY4WT',
  secretAccessKey: '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',
  region: 'ap-northeast-1',
});
const autoScaling = new AWS.AutoScaling();
const AutoScalingGroupName = 'All-inVersion3';
export const openAutoScaling = async () => {
  const params = {
    AutoScalingGroupName,
    DesiredCapacity: 3,
  };
  autoScaling.updateAutoScalingGroup(params, (err, AWSdata) => {
    console.log(AWSdata);
    if (err) {
      console.error(`Error triggering Auto Scaling: ${err.message}`);
    } else {
      console.log(
        `Auto Scaling triggered successfully. Desired capacity set to ${3}.`,
      );
    }
  });
};

export const closeAutoScaling = () => {
  const params = {
    AutoScalingGroupName,
    DesiredCapacity: 0,
  };
  autoScaling.updateAutoScalingGroup(params, (err, AWSdata) => {
    console.log(AWSdata);
    if (err) {
      console.error(`Error triggering Auto Scaling: ${err.message}`);
    } else {
      console.log(
        `Auto Scaling triggered successfully. Desired capacity set to ${0}.`,
      );
    }
  });
};

export const describeAutoScaling = () => {
  autoScaling.describeAutoScalingGroups(
    {
      AutoScalingGroupNames: [AutoScalingGroupName],
    },
    (err, data) => {
      if (err) {
        console.error(`Error describing Auto Scaling group: ${err.message}`);
      } else {
        const currentDesiredCapacity =
          data.AutoScalingGroups[0].DesiredCapacity;
        console.log(`EC2 capacity is ${currentDesiredCapacity}`);
        if (currentDesiredCapacity === 0) {
          openAutoScaling();
        }
      }
    },
  );
};
