const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.userRegister = (req, res, next) => {
	User.find({email: req.body.email}).exec()
	.then(user => {
		if(user.length >= 1) {
			res.status(409).json({
				message: "This email address allready exist."
			});
		} else {
			if(req.body.password !== req.body.repeatPassword) {
				return res.status(500).json({
					message: "Paswords are not the same."
				});
			}
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if(err) {
					return res.status(500).json({
						error: err
					});
				} else {
					const user = new User({
						email: req.body.email,
						password: hash
					});
					user.save()
						.then(result => {
							res.status(201).json({
								message: "Your account has been created, check your email to activate account",
								user: user
							});
						})
						.catch(err => {
							res.status(500).json({
								message: err
							})
						});
				}
			})
		}
	});
};
exports.userLogin = (req, res, next) => {};
exports.userDelete = (req, res, next) => {};