<template>
    <main
        class="main column"
        :class="`main_${state}`">
        <section class="options main__options">
            <div class="row select-service options__select-service">
                <select
                    class="col-5 custom-select select-service__select"
                    v-model="selectedOption">
                    <option
                        class="select-service__option"
                        v-for="service in services"
                        :key="service.id"
                        :value="service.id">
                        {{ service.title }} - {{ service.price }}&euro;
                    </option>
                </select>
                <button
                    class="btn btn-success col-auto select-service__submit"
                    type="submit"
                    @click.prevent="orderNewService(selectedOption)">
                    Order
                </button>
            </div>
            <div
                class="row custom-control custom-checkbox
                show-active-orders-only options__show-active-orders-only">
                <input
                    type="checkbox"
                    id="show-active-orders-only"
                    class="custom-control-input show-active-orders-only__checkbox"
                    v-model="showActiveOrdersOnly">
                <label
                    for="show-active-orders-only"
                    class="custom-control-label show-active-orders-only__label">
                    Show active orders only
                </label>
            </div>
        </section>
        <table class="table table-bordered text-center main__table">
            <thead class="thead-dark">
                <tr class="table__tr table__header">
                    <th class="table__cell table__cell_data-time table__cell_header">
                        Date &amp; Time
                    </th>
                    <th class="table__cell table__cell_title table__cell_header">
                        Title
                    </th>
                    <th class="table__cell table__cell_price table__cell_header">
                        Price
                    </th>
                    <th class="table__cell table__cell_status table__cell_header">
                        Status
                    </th>
                    <th class="table__cell table__cell_cancel table__cell_header">
                        Cancel the orders
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="table__tr"
                    v-for="(service, index) in reversedOrderedServices"
                    :key="index"
                    v-show="!showActiveOrdersOnly || (service.isActual && showActiveOrdersOnly)">
                    <td class="table__cell table__cell_data-time">
                        {{ service.serviceDateTime }}
                    </td>
                    <td class="table__cell table__cell_title">
                        {{ service.title }}
                    </td>
                    <td class="table__cell table__cell_price">
                        {{ service.price }}&euro;
                    </td>
                    <td class="table__cell table__cell_status">
                        {{ service.isActual ? 'Actual' : 'Done' }}
                    </td>
                    <td class="table__cell table__cell_cancel">
                        <button
                            v-if="service.isActual"
                            class="btn btn-danger table__submit_cancel"
                            @click="cancelTheOrder(getReversedIndex(index), service.title)">
                            Cancel
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import { EventBus } from '../../assets/js/event-bus.js';

export default {
    props: {
        state: String,
        orderedServices: Array,
        services: Array,
        preferServiceId: [Number, null],
    },
    data() {
        EventBus.$on('deleteOrder', this.deleteOrder);

        return {
            showActiveOrdersOnly: false,
            selectedOption: this.preferServiceId || 1,
        }
    },
    computed: {
        reversedOrderedServices() {
            return this.orderedServices ? this.orderedServices.slice().reverse() : [];
        },
    },
    watch: {
        selectedOption(newValue) {
            if (this.preferServiceId !== null) this.$emit('changePreferServiceId', newValue);
        },
    },
    methods: {
        getReversedIndex(id) {
            return this.reversedOrderedServices.length - id - 1;
        },
        cancelTheOrder(orderedServiceId, serviceTitle) {
            EventBus.$emit(
                'confirm',
                orderedServiceId,
                `Do you really want to cancel the order "${serviceTitle}"?`
            );

            this.$emit('setPopUpType', 'confirm');
        },
        orderNewService(serviceId) {
            const service = this.services.filter(service => service.id === serviceId)[0];
            Object.assign(
                service,
                {
                    'serviceDateTime': 'Unset',
                    'isActual': true,
                }
            );
            this.orderedServices.push(service);
        },
        deleteOrder(cancelledServiceId) {
            this.orderedServices.splice(cancelledServiceId, 1);
            this.$emit('setPopUpType', null);
        },
    },
    beforeDestroy() {
        // For prevent event handler call multiple times.
        EventBus.$off('deleteOrder');
    },
}
</script>

<style lang="scss" scoped>
    $margin: 0.5rem;

    %icon-font {
        font-family: "FontAwesome";
    }

    .select-service {
        &__select {
            min-width: 220px;
        }

        &__submit {
            margin-left: $margin;

            &:before {
                content:"\f07a";
                @extend %icon-font;
            }
        }
    }

    .main {
        &__options {
            margin-top: $margin;
        }
    }

    .options {
        &__select-service {
            margin: 0;
        }

        &__show-active-orders-only {
            margin: $margin 0;
        }
    }

    .table {
        margin: 0;

        &__cell {
            vertical-align: middle;

            &:empty {
                padding: 0;
                border: 0;
            }
        }

        &__submit_cancel:before {
            content: "\f1f8";
            @extend %icon-font;
        }
    }

    @media screen and (max-width: 789px) {
        .options {
            &__select-service, &__show-active-orders-only {
                margin-left: 10px;
            }
        }
    }
</style>