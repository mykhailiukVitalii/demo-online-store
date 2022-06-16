require('dotenv').config();
const sequelize = require("./src/db/db-config");
const app = require("./src/app");

//APP CONSTANTs(provide App port)
const PORT = process.env.PORT || 5053;
//START server functionality
const start = async () => {
    try {
        await sequelize.authenticate();
        //Еси в бд есть подобная таблица, но она не соответствует определению модели, то мы можем 
        //использовать параметр {force: true}, чтобы удалить таблицы и создать их заново, 
        //но уже с нужной нам структурой
        // await sequelize.sync({force: true});
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
          });
    } catch (e) {
        console.log("Server unknown error: ", e);
        process.exit();
    }
}

start();