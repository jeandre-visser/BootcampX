const { Pool } = require('pg');

const pool = new Pool({
  row: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT 
teachers.name as teacher, 
cohorts.name  as cohort
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`)
  })
});