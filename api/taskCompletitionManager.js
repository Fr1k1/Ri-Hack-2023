import cron from 'node-cron'
import sqlite from 'sqlite3'

let connection

const connectToDb = () =>
    new Promise((resolve, reject) => {
        connection = new sqlite.Database('./database.db', (err) => {
            if (err) {
                reject(err);
                console.log("Db doesn't exist.");
                process.exit(1);
            } else {
                resolve(connection);
            }
        });
    });

const startTaskCompletitionListener = async () => {
    const exec = async (sql, data) => {
        await connection.exec('PRAGMA foreign_keys = ON')

        return new Promise((resolve, reject) => {
            if (/^SELECT/i.test(sql)) {
                connection.all(sql, data, (err, res) => {
                    err ? reject(err) : resolve(res)
                })
            } else {
                connection.run(sql, data, function (err) {
                    return err ? reject(err) : resolve(this)
                })
            }
        })
    }

    function getYearDateEntry(date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    try {
        const currentDate = new Date();

        const sevenDaysLater = new Date(currentDate);
        sevenDaysLater.setDate(currentDate.getDate() + 7);

        sevenDaysLater.setDate(sevenDaysLater.getDate() - 1);
        sevenDaysLater.setHours(23, 59, 0, 0);

        const currentDateStr = getYearDateEntry(currentDate)

        let completedTasks = await exec("SELECT * FROM task WHERE ? >= strftime('%Y-%m-%d', end_date) AND status_id < 4;", [currentDateStr]);

        console.log(completedTasks)

        completedTasks.forEach(async element => {
            await exec("UPDATE task SET status_id= 4, valid_until = ? WHERE id=?", [sevenDaysLater, element.id])
        });
    } catch (error) {
        console.error("Error connecting to the database:", error)
    }
}

await connectToDb()

cron.schedule('* * * * *', async () => {
    console.log('Starting the task completion listener at 11:59 PM...')
    await startTaskCompletitionListener()
    console.log('Task completion listener completed.')
})