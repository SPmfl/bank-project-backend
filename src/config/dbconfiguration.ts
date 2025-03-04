export default () => ({
  type: "postgres",
  host: process.env.DATABASE_HOST || "" ,
  port: parseInt(process.env.DATABASE_PORT || "", 10) || 5432,
  username: process.env.DATABASE_USER || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_DB || "",
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  synchronize: true,
})
