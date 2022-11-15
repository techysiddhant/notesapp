const Note = require('../models/Note');
const moment = require("moment");
class NotesController {
    static login = (req, res) => {
        res.render("login");
    }
    static getAllNotes = async(req, res) => {
        try {
            const user = req.user;
            const notes = await Note.find({ user: req.user }).sort({ createdAt: 1 }).lean();
            res.render("dashboard", { notes, moment, user });

        } catch (error) {
            console.log(error)
        }
    }
    static addnote = (req, res) => {
        res.render("addnote");
    }
    static createnote = async(req, res) => {
        try {
            // console.log(req.body);
            const { title, description } = req.body;
            const doc = new Note({
                user: req.user,
                title: title,
                description: description,
                createdAt: new Date()
            });
            // const date = new Date();
            // console.log(date);

            const result = await doc.save();
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error)
        }
    }
    static editNote = async(req, res) => {
        // console.log(req.params.id)
        try {
            const result = await Note.findById(req.params.id);
            res.render("edit", { data: result });
        } catch (error) {
            console.log(error);
        }
    }
    static updateNote = async(req, res) => {
        try {
            const result = await Note.findByIdAndUpdate(req.params.id, req.body);
            res.redirect("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }
    static deleteNote = async(req, res) => {
        try {
            const result = await Note.findByIdAndDelete(req.params.id);
            res.redirect("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }
    static showNote = async(req, res) => {
            try {
                const result = await Note.findById(req.params.id);
                res.render("show", { data: result });
            } catch (error) {
                console.log(error);
            }
        }
        // static getNotes = async(req, res) => {
        //     let payload = req.body.payload.trim();
        //     console.log(payload);
        //     let search = await Note.find({ title: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
        //     search = search.slice(0, 10);
        //     res.send({ payload: search });
        // }
    static searchresults = async(req, res) => {
        const { search } = req.body;
        // console.log(req.user._id);
        if (!search) {
            res.render("searchresult", { results: search, user: req.user, moment });
        }
        // const data = await Note.find({ title: { $regex: search, $options: '$i' } })
        const data = await Note.find({
                "$and": [
                    { title: { $regex: search, $options: '$i' } },
                    { user: req.user._id }
                ]
            })
            // console.log(data);
        res.render("searchresult", { results: data, user: req.user, moment });
    }

}





module.exports = NotesController;