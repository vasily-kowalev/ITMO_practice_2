<template>
    <header class="bg-light header page__header">
        <img
            src="public/img/logo.png"
            class="header__logo"
            alt="Barbershop 'Old School'"
            title="Barbershop 'Old School'">
        <div
            class="account-info header__account-info"
            v-if="currentUser !== null">
            <button
                class="btn btn-light account-info__link account-info__link_main-page"
                type="button"
                v-if="state === 'personal-area'"
                @click="$emit('changeState', 'main-page')">
                <span class="fa fa-home account-info__link_main-page-icon" />
                Main page
            </button>
            <button
                class="btn btn-light account-info__link account-info__link_personal-area"
                type="button"
                v-else
                @click="$emit('changeState', 'personal-area')">
                <span class="fa fa-user account-info__link_personal-area-icon" />
                Personal area
            </button>
            <span
                class="account-info__username"
                title="It's You!">
                {{ currentUser.fullName }}
            </span>
            <button
                class="btn btn-danger account-info__button_sign-out"
                @click="$emit('signOut')">
                <span class="fa fa-sign-out header__icon header__icon_sign-out" />
                Sign out
            </button>
        </div>
        <div
            class="header__links"
            v-else>
            <button
                class="btn btn-dark header__link header__link_reg"
                @click="$emit('setPopUpType', 'reg')">
                <span class="fa fa-user-plus header__icon header__icon_sign-up" />
                Sign up
            </button>
            <button
                class="btn btn-dark header__link header__link_auth"
                @click="$emit('setPopUpType', 'auth')">
                <span class="fa fa-sign-in header__icon header__icon_sign-in" />
                Sign in
            </button>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        state: String,
        currentUser: Object,
    },
}
</script>

<style lang="scss" scoped>
    .header {
        border-bottom: 1px solid #dddddd;
        display: flex;
        justify-content: space-between;
        min-width: 460px;
        padding: 10px;

        &__logo {
            max-height: 38px;
        }
    }

    .account-info {
        &__link, &__username {
            margin-right: .5rem;
        }

        &__username {
            vertical-align: middle;
        }
    }
</style>