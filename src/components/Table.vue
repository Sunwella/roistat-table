<script>
    export default {
        props: ['columns', 'items', 'keyField', 'parentKeyField'],
        data() {
            return {
                whichItemsOpen: [],
                sortedColName: null,
                isSortAsc: false,
            }
        },
        methods: {
            createRow(item, depth) {
               return this.$createElement('b-tr', this.columns.map(col => this.createTD(item, col, depth)))
            },
            createTD(item, col, depth) {
                return this.$createElement('b-td', 
                    !this.$scopedSlots[`cell(${col})`] ? item[col] : this.$scopedSlots[`cell(${col})`]({
                        item,
                        hasChildren: this.hasChildren(item),
                        isExpanded: this.isExpanded(item),
                        toggleExpand: () => this.toggleExpand(item),
                        depth,
                    })
                );
            },
            sort(colName) {
                this.isSortAsc = this.sortedColName === colName ? !this.isSortAsc : true;

                this.sortedColName = colName;
            },
            hasChildren(item) {
                return item[this.keyField] in this.childrenItems
            },
            createRootAndChildrenRows(item, depth = 0) {
                let result = [];
                result.push(this.createRow(item, depth));

                if (this.hasChildren(item) && this.isExpanded(item)) {
                    this.childrenItems[item[this.keyField]].forEach(child =>  {
                        result.push(this.createRootAndChildrenRows(child, depth + 1));
                    })
                }
                return result;
            },
            isExpanded(item) {
                return this.whichItemsOpen.includes(item[this.keyField]);
            },
            toggleExpand(item) {
                if (this.isExpanded(item)) {
                    const index = this.whichItemsOpen.indexOf(item[this.keyField]);
                    this.whichItemsOpen.splice(index, 1);
                } else {
                    this.whichItemsOpen.push(item[this.keyField])
                }
            }

        },
        computed: {
            rootItems() {
                return this.sortedTable.filter(item => item[this.parentKeyField] === null)
            },
            childrenItems() {
                let result = {};
                let currentValue;

                this.sortedTable.forEach(item => {
                    currentValue = item[this.parentKeyField];

                    if (!(currentValue in result)) {
                        result[currentValue] = [];
                    }

                    if (currentValue === item[this.parentKeyField]) {
                        result[currentValue].push(item);
                    }
                })
                return result;
            },
            sortedTable() {
                let items = [...this.items]
                return items.sort((a, b) => {
                    if(this.isSortAsc) {
                        return a[this.sortedColName] > b[this.sortedColName] ? 1 : -1;
                    } else {
                        return a[this.sortedColName] < b[this.sortedColName] ? 1 : -1;
                    }
                })
            }
        },
        render() {           
            return this.$createElement('b-table-simple', [
                this.$createElement('b-tr', this.columns.map(col => this.$createElement('b-th',{ 
                    on:{
                        click:() => this.sort(col),
                    }
                }, col))),
                this.rootItems.map(item => this.createRootAndChildrenRows(item)),
            ]);
        }
    }
</script>