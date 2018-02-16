const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

exports.userRegister = (req, res, next) => {
	User.find({email: req.body.email}).exec()
	.then(user => {
		if(user.length >= 1) {
			return res.status(409).json({
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
				}
				const user = new User({
					email: req.body.email,
					password: hash
				});
				user.save()
					.then(result => {
						return res.status(201).json({
							message: "Your account has been created, check your email to activate account",
							user: user
						});
					})
					.catch(err => {
						return res.status(500).json({
							message: err
						})
					});
			})
		}
	});
};
exports.userLogin = (req, res, next) => {
	User.findOne({email: req.body.email}).exec()
		.then(user => {
			if(!user) {
				return res.status(401).json({
					message: "Incorrect email or password"
				});
			} 
			const hash = user.password;
			bcrypt.compare(req.body.password, hash, (err, result) => {
				if(err || !result) {
					return res.status(401).json({
						message: "Incorrect email or password"
					});
				}
				const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
				return res.status(200).json({
					message: "Logged in",
					token: token
				});
			});
		})
		.catch(err => {
			return res.status(401).json({
				message: "Incorrect email or password"
			})
		})
};
exports.userAccount = (req, res, next) => {};