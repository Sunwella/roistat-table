<template>
  <div id="app">
    <b-container>
      <b-button class="my-5" @click="modalIsShown = !modalIsShown">Добавить</b-button>
      <template v-if="modalIsShown">
        <NewEmployeeModal :is-shown="modalIsShown" :employees="employees" @save="onEmployeeSave" />
      </template>
      <Table 
        :columns="columns" 
        :items="employees"
        key-field="id"
        parent-key-field="bossId"
      >
        <template #cell(name)="{ item, hasChildren, isExpanded, toggleExpand, depth }">
          <div :style="{ marginLeft: `${depth * 2}em` }">
            <b-button size="sm" v-if="hasChildren" class="mr-2" @click="toggleExpand">
              {{ isExpanded ? '-' : '+' }}
            </b-button>
            {{ item.name }}
          </div>
        </template>
      </Table>
    </b-container>
  </div>
</template>

<script>
  import Table from './components/Table'
  import NewEmployeeModal from './components/NewEmployeeModal'
  import { getEmployees, saveEmployee } from './components/data'

  export default {
    created() {
        this.employees = getEmployees();
    },
    components: {
      Table,
      NewEmployeeModal
    },
    data() {
      return {
        employees: [],
        modalIsShown: false,
      }
    },
    methods: {
      onEmployeeSave(newEmployee) {
          saveEmployee(newEmployee);
          this.modalIsShown = false;
          this.employees = getEmployees();
      }
    },
    computed: {
      columns() {
        return [
          {
            key: 'name',
            label: 'Имя'
          },
          {
            key: 'phone',
            label: 'Телефон'
          }
        ];
      }
    }
  }
</script>
