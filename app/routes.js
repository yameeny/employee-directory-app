// employee model 
var Employee = require('./models/employee');


module.exports = function (app) {

    // server routes ===========================================================
   
    // save a new employee in database

    app.post('/api/save', function (req, res) {

        var employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            department: req.body.dept,
            gender: req.body.gender
        });

        employee.save(function (err, fluffy) {
            if (err) return console.error(err);
            console.log("Employee saved");
            res.json({status:200,message:"Employee saved"});
        });


    });
    
    // show all employees
    app.get('/api/view', function (req, res) {
        
        Employee.find({}, function(err, employees) {
            res.send(employees);  
        });
        
    });
    
    // show all employees
    app.delete('/api/delete', function (req, res) {
        Employee.findByIdAndRemove(req.query._id, function(err, emp){  
            var response = {
                message: "Employee successfully deleted",
                id: req.query._id
            };
            res.status(200).send(response);
        });
        
    });
    
    // Update employees
    app.put('/api/update', function (req, res) {
          
        // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
        // Find the existing resource by ID
        Employee.findById(req.query._id, function(err, emp){  
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                emp.name = req.query.name || emp.name;
                emp.email = req.query.email || emp.email;
                emp.dob = req.query.dob || emp.dob;
                emp.department = req.query.department || emp.department;
                emp.gender = req.query.gender || emp.gender;

                // Save the updated document back to the database
                emp.save((err, emp) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.status(200).send(emp);
                });
            }
        });
    });
    
    app.use(function (req, res) {
        res.sendFile('index.html', {
            root: './public'
        });
    });

};