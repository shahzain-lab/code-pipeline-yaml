import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as appsync from '@aws-cdk/aws-appsync-alpha' 

export class CodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'graphqlApi', {
      name: 'VirtualLolly EventBridge Graphql',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        }
      }
    });

    const lambdafn = new lambda.Function(this, 'lambdafnn', {
      functionName: 'my-new-pipeline-yaml',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromInline(`exports.handler = (event)=>{ return "Hello world" }`),
      handler: 'index.handler'
    })

    const lambdaDS = api.addLambdaDataSource('datas', lambdafn)
    
    lambdaDS.createResolver({
      typeName: 'Query',
      fieldName: 'hello'
    })

  }
}
