<template>
    <b-modal v-model="isShown" title="Добавление пользователя" hide-footer>
        <div>
            <b-form-group
                id="input-group-1"
                label="Имя:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="newEmployee.name"
                    placeholder="Введите имя"
                    required
                />
            </b-form-group>

            <b-form-group 
                id="input-group-2" 
                label="Телефон:" 
                label-for="input-2"
            >
                <b-form-input
                    id="input-2"
                    v-model="newEmployee.phone"
                    placeholder="Введите телефон"
                    required
                />
            </b-form-group>

            <b-form-group id="input-group-3" label="Начальник:" label-for="input-3">
                <b-form-select
                    id="input-3"
                    v-model="newEmployee.bossId"
                    :options="options"
                    text-field="name"
                    value-field="id"
                />
            </b-form-group>

            <b-button variant="primary" @click="saveNewEmployee">Сохранить</b-button>
        </div>
    </b-modal>
</template>

<script>
    export default {
        props: ["isShown", "employees"],
        created() {
            this.options = [...this.employees];
            this.options.unshift({id: null, name: 'Нет начальника'});
            this.newEmployee.id = this.options[this.options.length - 1].id + 1;
        },
        data() {
            return {
                newEmployee: {
                    id: null,
                    name: '',
                    phone: '', 
                    bossId: null,
                },
                options: [],
            }
        },
        methods: {
            saveNewEmployee() {
                this.$emit('save', this.newEmployee);
            }
        }
    }
</script>