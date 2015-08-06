# -*- coding: utf-8 -*-
from flask_wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo, Length

from brome.webserver.extensions import db
from brome.core.model.user import User

class RegisterForm(Form):
    username = TextField('Username',
                    validators=[DataRequired(), Length(min=3, max=25)])
    email = TextField('Email',
                    validators=[DataRequired(), Email(), Length(min=6, max=40)])
    password = PasswordField('Password',
                                validators=[DataRequired(), Length(min=6, max=40)])
    confirm = PasswordField('Verify password',
                [DataRequired(), EqualTo('password', message='Passwords must match')])
    token = PasswordField('Token')

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        self.app = kwargs.get('app')
        self.user = None

    def validate(self):
        initial_validation = super(RegisterForm, self).validate()
        if not initial_validation:
            return False

        if self.app.config.get('CLOSED_REGISTRATION', False):
            if self.token.data != self.app.config.get('REGISTRATION_TOKEN'):
                self.token.errors.append("The registration security token doesn't match")
                return False

        user = db.session.query(User).filter_by(username = self.username.data).first()
        if user:
            self.username.errors.append("Username already registered")
            return False

        user = db.session.query(User).filter_by(email = self.email.data).first()
        if user:
            self.email.errors.append("Email already registered")
            return False

        return True
