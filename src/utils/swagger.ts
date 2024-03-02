import {Express, Request, Response} from 'express';
import swaggerJSDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {version} from '../../package.json';
// import log from './logger' 

const options: swaggerJSDocs.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    schme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['./src/routes/*.ts', "./src/controllers/*.ts"],
}

const swaggerSpec = swaggerJSDocs(options)

function swwaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


    // Docs and JSON format
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`);
    
}

export default swwaggerDocs;