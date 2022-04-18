import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdafn = new lambda.Function(this, 'lambdafnn', {
      functionName: 'my-new-pipeline-yaml',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromInline(`exports.handler=async()=>return 'Hello world'`),
      handler: 'index.handler'
    })
    
  }
}
