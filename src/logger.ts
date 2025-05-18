import winston, { Logger } from 'winston';
import { ElasticsearchTransport, ElasticsearchTransformer, LogData, TransformedData } from 'winston-elasticsearch';

export const winstonLogger = (name: string, level: string, elasticSearchNode: string): Logger => {
    const options = {
        console: {
            level: level,
            handleExceptions: true,
            json: true,
            colorize: true,
        },
        elasticsearch: {
            level: level,
            handleExceptions: true,
            clientOpts: {
                node: elasticSearchNode,
                maxRetries: 10,
                requestTimeout: 30000,
            },
            transformer: (logData: LogData): TransformedData => {
                return ElasticsearchTransformer(logData);
            },
            indexPrefix: name,
            indexSuffixPattern: 'YYYY.MM.DD',
            indexSuffix: '',
            indexName: '',
        }
    };

    const logger = winston.createLogger({
        exitOnError: false,
        defaultMeta: {
            service: name,
        },
        transports: [
            new winston.transports.Console(options.console),
            new ElasticsearchTransport(options.elasticsearch),
        ],
    });

    return logger;
}


