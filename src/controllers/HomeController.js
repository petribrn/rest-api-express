import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: 'Daniele',
      last_name: 'Petri',
      email: 'daniele.m.petri@gmail.com',
      age: 41,
      weight: 60,
      height: 1.70,
    });
    res.json(newStudent);
  }
}

export default new HomeController();
