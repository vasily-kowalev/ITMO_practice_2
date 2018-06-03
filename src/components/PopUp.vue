<template>
    <div class="pop-up page__pop-up" v-if="popUpIsVisible">
        <div class="pop-up__wrapper" 
             :class="{ 'pop-up__wrapper_confirm': popUpType === 'confirm' }">
            <span class="pop-up__close fa fa-close" 
                  @click="changePopUpType(null)">
            </span>
            <template v-if="popUpType === 'confirm'">
                <h3 class="pop-up__title">
                    {{ confirmMessage }}
                </h3>
                <div class="pop-up__buttons">
                    <button class="btn btn-danger pop-up__button pop-up__button_no" 
                            type=button 
                            @click="changePopUpType(null)">
                        No
                    </button>
                    <button class="btn btn-success pop-up__button pop-up__button_yes" 
                            type=button 
                            @click="confirmYes">
                        Yes
                    </button>
                </div>
            </template>
            <template v-else-if="popUpType === 'reg'">
                <div class="reg-block pop-up__reg-block" key="reg-block">
                    <h2 class="reg-block__title pop-up__title">
                        <span class="fa fa-user-plus reg-block__title-icon"></span>
                        Registration
                    </h2>
                    <form class="form needs-validation reg-block__form" 
                          @submit.prevent="checkRegisterForm" 
                          ref="reg-form" 
                          novalidate>
                        <div class="form__field form__field_full-name">
                            <label for="reg-full-name" 
                                   class="form_description form_description_full-name">
                                Full name
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="reg-full-name" 
                                           class="fa fa-user-circle input-group-text">
                                    </label>
                                </div>
                                <input type="text" 
                                       class="form-control form__input form__input_full-name" 
                                       ref="reg-full-name" 
                                       id="reg-full-name" 
                                       minlength="3" 
                                       maxlength="30" 
                                       pattern="^[a-zA-Z]{2,} [a-zA-Z]{2,}$" 
                                       placeholder="John Doe" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.regFullName }}
                                </div>
                            </div>
                        </div>
                        <div class="form__field form__field_email">
                            <label for="reg-email" 
                                   class="form_description form_description_email">
                                Email
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="reg-email" 
                                           class="fa fa-envelope-o input-group-text">
                                    </label>
                                </div>
                                <input type="email" 
                                       class="form-control form__input form__input_email" 
                                       ref="reg-email" 
                                       id="reg-email" 
                                       placeholder="john-doe@site.ru" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.regEmail }}
                                </div>
                            </div>
                        </div>
                        <div class="form__field form__field_phone">
                            <label for="reg-phone" 
                                   class="form_description form_description_phone">
                                Mobile phone number
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="reg-phone" 
                                           class="fa fa-phone input-group-text">
                                    </label>
                                </div>
                                <input type="tel" 
                                       class="form-control form__input form__input_phone" 
                                       ref="reg-phone" 
                                       id="reg-phone" 
                                       maxlength="12" 
                                       pattern="^\+\d{11}$" 
                                       placeholder="+01234567890" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.regPhone }}
                                </div>
                            </div>
                        </div>
                        <div class="form__field form__field_pass">
                            <label for="reg-pass" 
                                   class="form_description form_description_pass">
                                Password (6 characters minimum)
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="reg-pass" 
                                           class="fa fa-lock input-group-text">
                                    </label>
                                </div>
                                <input type="password" 
                                       class="form-control form__input form__input_pass" 
                                       ref="reg-pass" 
                                       id="reg-pass" 
                                       minlength="6" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.regPassword }}
                                </div>
                            </div>
                        </div>
                        <div class="form__field form__field_pass-confirm">
                            <label for="reg-pass-confirm" 
                                   class="form_description form_description_pass-confirm">
                                Password confirmation
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="reg-pass-confirm" 
                                           class="fa fa-lock input-group-text">
                                    </label>
                                </div>
                                <input type="password" 
                                       class="form-control form__input form__input_pass-confirm" 
                                       ref="reg-pass-confirm" 
                                       id="reg-pass-confirm" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.regPasswordConfirm }}
                                </div>
                            </div>
                        </div>
                        <button type="submit" 
                                class="btn btn-dark form__submit" 
                                ref="reg-submit">
                            Sign up
                        </button>
                    </form>
                    <a href="" 
                       class="badge badge-light form__cross-link form__cross-link_sign-in" 
                       @click.prevent="changePopUpType('auth')">
                        <span class="fa fa-sign-in form__cross-link_sign-in-icon"></span>
                        Sign in
                    </a>
                </div>
            </template>
            <template v-else-if="popUpType === 'auth'">
                <div class="auth-block pop-up__auth-block" key="auth-block">
                    <h2 class="auth-block__title pop-up__title">
                        <span class="fa fa-sign-in auth-block__title-icon"></span>
                        Authorization
                    </h2>
                    <form class="form needs-validation auth-block_form" 
                          ref="auth-form" 
                          @submit.prevent="checkAuthForm" 
                          novalidate>
                        <div class="form__field form__field_email">
                            <label for="auth-email" 
                                   class="form_description form_description_email">
                                Email
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="auth-email" 
                                           class="fa fa-user-circle input-group-text">
                                    </label>
                                </div>
                                <input type="email" 
                                       class="form-control form__input form__input_email" 
                                       ref="auth-email" 
                                       id="auth-email" 
                                       placeholder="john-doe@site.ru" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.authEmail }}
                                </div>
                            </div>
                        </div>
                        <div class="form__field form__field_pass">
                            <label for="auth-pass" 
                                   class="form_description form_description_password">
                                Password
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label for="auth-pass" 
                                           class="fa fa-lock input-group-text">
                                    </label>
                                </div>
                                <input type="password" 
                                       class="form-control form__input form__input_pass" 
                                       ref="auth-pass" 
                                       id="auth-pass" 
                                       required>
                                <div class="invalid-feedback">
                                    {{ errors.authPassword }}
                                </div>
                            </div>
                        </div>
                        <button type="submit" 
                                class="btn btn-dark form__submit" 
                                ref="auth-submit">
                            Sign in
                        </button>
                    </form>
                    <div class="custom-control custom-checkbox form__keep-logged-in">
                        <input type="checkbox" 
                               class="custom-control-input form__keep-logged-in_checkbox" 
                               id="keep-logged-in" 
                               ref="keep-logged-in" 
                               checked>
                        <label for="keep-logged-in" 
                               class="custom-control-label form__keep-logged-in_label">
                            Keep me logged in
                        </label>
                    </div>
                    <a href="" 
                       class="badge badge-light form__cross-link form__cross-link_sign-up" 
                       @click.prevent="changePopUpType('reg')">
                        <span class="fa fa-user-plus form__cross-link_sign-up-icon"></span>
                        Sign up
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../../assets/js/event-bus.js';
    
    const errorsInitialState = {
        regFullName: 'Incorrect or empty full name! See valid format in the placeholder.',
        regEmail: 'Incorrect or empty email address! See valid format in the placeholder.',
        regPhone: 'Incorrect or empty phone number! See valid format in the placeholder.',
        regPassword: 'Too short password! It must contain 6 characters minimum.',
        regPasswordConfirm: 'Passwords are not equal!',
        authEmail: 'Incorrect or empty email address! See valid format in the placeholder.',
        authPassword: 'Invalid password!',
    };
    
    export default {
        props: ['popUpType', 'users'],
        data() {
            EventBus.$on('confirm', (orderedServiceId, message) => {
                this.canceledServiceId = orderedServiceId;
                this.confirmMessage = message;
            });
            
            return {
                confirmMessage: '',
                canceledServiceId: null,
                errors: { ...errorsInitialState }
            }
        },
        computed: {
            popUpIsVisible() {
                return this.popUpType !== null;
            },
        },
        methods: {
            clearErrors() {
                this.errors = { ...errorsInitialState };
            },
            confirmYes() {
                EventBus.$emit('deleteOrder', this.canceledServiceId);
                this.confirmMessage = '';
                this.canceledServiceId = null;
            },
            changePopUpType(type) {
                this.$emit('setPopUpType', type);
                this.clearErrors();
            },
            checkPasswords(pass, passConfirm) {
                return pass === passConfirm;
            },
            findUser(email, phone) {
                for(let index in this.users) {
                    const userObject = this.users[index];
                    
                    if (userObject.email === email || userObject.phone === phone) {
                        return [userObject, +index]; // "+index" changes string to number.
                    }
                }
                
                return [null, null];
            },
            checkPreparing(controls, form) {
                controls.forEach(control => control.classList.remove('is-invalid'));
                form.classList.add('was-validated');
                this.clearErrors();
            },
            checkAuthForm() {
                const emailTarget = this.$refs['auth-email'],
                      passTarget = this.$refs['auth-pass'],
                      authForm = this.$refs['auth-form'];
                
                let formIsValid = true,
                    target = null;
                
                this.checkPreparing([
                        emailTarget, 
                        passTarget, 
                    ], authForm);
                
                const [foundedUserObject, foundedUserObjectIndex] = this.findUser(emailTarget.value, null);
                
                if (foundedUserObject) {
                    if (foundedUserObject.pass !== passTarget.value) {
                        passTarget.classList.add('is-invalid');
                        formIsValid = false;
                        target = target || passTarget;
                    }
                } else {
                    if (emailTarget.validity.valid) {
                        this.errors.authEmail = 'No such email address!';
                    }
                    emailTarget.classList.add('is-invalid');
                    formIsValid = false;
                    target = target || emailTarget;
                }
                
                if (formIsValid) {
                    this.authenticateUser(foundedUserObjectIndex);
                    localStorage.setObj('keepLoggedIn', this.$refs['keep-logged-in'].checked);
                } else {
                    passTarget.value = '';
                    target.focus();
                }
            },
            authenticateUser(userId) {
                this.$emit('setCurrentUserId', userId);
                this.changePopUpType(null);
            },
            checkRegisterForm() {
                const fullNameTarget = this.$refs['reg-full-name'], // For consistency.
                      emailTarget = this.$refs['reg-email'],
                      phoneTarget = this.$refs['reg-phone'],
                      passTarget = this.$refs['reg-pass'],
                      passConfirmTarget = this.$refs['reg-pass-confirm'],
                      regForm = this.$refs['reg-form'];
                
                let formIsValid = true,
                    target = null;
                
                this.checkPreparing([
                        fullNameTarget, 
                        emailTarget, 
                        phoneTarget, 
                        passTarget, 
                        passConfirmTarget
                    ], regForm);
                
                if (!/^[a-zA-Z]{2,} [a-zA-Z]{2,}$/.test(fullNameTarget.value)) {
                    fullNameTarget.classList.add('is-invalid');
                    formIsValid = false;
                    target = target || fullNameTarget;
                }
                
                const [foundedUserObject] = this.findUser(emailTarget.value, phoneTarget.value);
                    
                if (foundedUserObject) {
                    const emailExist = foundedUserObject.email === emailTarget.value;
                    
                    if (emailExist) {
                        if (emailTarget.validity.valid) {
                            this.errors.regEmail = 'User with such email already exist!';
                        }
                        emailTarget.classList.add('is-invalid');
                        target = target || emailTarget;
                    } else {
                        if (phoneTarget.validity.valid) {
                            this.errors.regPhone = 'User with such phone number already exist!';
                        }
                        phoneTarget.classList.add('is-invalid');
                        target = target || phoneTarget;
                    }
                    
                    formIsValid = false;
                }
                
                if (passTarget.value.length < passTarget.getAttribute('minlength')) {
                    passTarget.classList.add('is-invalid');
                    formIsValid = false;
                    target = target || passTarget;
                }
                    
                if (!this.checkPasswords(passTarget.value, passConfirmTarget.value)) {
                    passConfirmTarget.classList.add('is-invalid');
                    formIsValid = false;
                    target = target || passConfirmTarget;
                }
                
                if (formIsValid) {
                    this.registerUser(fullNameTarget.value, 
                                      emailTarget.value, 
                                      phoneTarget.value, 
                                      passTarget.value);
                } else {
                    passTarget.value = '';
                    passConfirmTarget.value = '';
                    target.focus();
                }
            },
            registerUser(fullName, email, phone, pass) {
                const newUserId = this.users.push(
                    {
                        fullName,
                        email,
                        phone,
                        pass,
                        orderedServices: [],
                    }
                );
                
                // users.push() returns indexes starting with 1.
                this.authenticateUser(newUserId - 1);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .pop-up {
        align-items: center;
        background-color: rgba(black, 0.75);
        display: grid;
        height: 100vh;
        min-width: 460px;
        overflow: auto;
        position: absolute;
        width: 100vw;
        z-index: 10;
        
        &__wrapper {
            background-color: white;
            border-radius: 0.5rem;
            margin: 0 auto;
            padding: 20px;
            position: relative;
            width: 560px;
        }
        
        &__close {
            cursor: pointer;
            font-size: 20px;
            position: absolute;
            right: 20px;
            top: 20px;
        }
        
        &__message {
            margin-top: 1rem;
        }
        
        &__title {
            margin-top: 20px;
            text-align: center;
        }
        
        &__buttons {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
        }
        
        &__button {
            margin: 0 1rem;
            
            &_no:before, &_yes:before {
                font-family: "FontAwesome";
            }
            
            &_no:before {
                content: "\f05e";
            }
            
            &_yes:before {
                content: "\f00c";
            }
        }
    }
    
    .form {
        &__field, &__submit, &__keep-logged-in, &__cross-link {
            margin-top: 1rem;
        }
        
        &__description {
            display: block;
        }
        
        &__cross-link {
            font-size: 14px;
        }
    }
    
    .form-control.is-invalid {
        border-color: #dc3545 !important;
    }
    
    @media screen and (max-width: 789px) {
        .pop-up {
            &__wrapper {
                border-radius: 0;
                height: 100%;
                margin: 0;
                width: inherit;
                
                &_confirm {
                    height: auto;
                }
            }
        }
    }
</style>