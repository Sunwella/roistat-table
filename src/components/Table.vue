<script>
    export default {
        props: ['columns', 'items', 'keyField', 'parentKeyField'],
        data() {
            return {
                whichItemsOpen: [],
                sortedColName: null,
                sortIsAsc: false,
            }
        },
        methods: {
            createRow(item, depth) {
               return this.$createElement('b-tr', this.columns.map(col => this.createTD(item, col.key, depth)))
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
            getKey(item) {
                return item[this.keyField];
            },
            getParentKey(item) {
                return item[this.parentKeyField];
            },
            sort(colName) {
                this.sortIsAsc = this.sortedColName === colName ? !this.sortIsAsc : true;

                this.sortedColName = colName;
            },
            hasChildren(item) {
                return this.getKey(item) in this.childrenItems
            },
            createRootAndChildrenRows(item, depth = 0) {
                let result = [];
                result.push(this.createRow(item, depth));

                if (this.hasChildren(item) && this.isExpanded(item)) {
                    this.childrenItems[this.getKey(item)].forEach(child =>  {
                        result.push(this.createRootAndChildrenRows(child, depth + 1));
                    })
                }
                return result;
            },
            isExpanded(item) {
                return this.whichItemsOpen.includes(this.getKey(item));
            },
            toggleExpand(item) {
                if (this.isExpanded(item)) {
                    const index = this.whichItemsOpen.indexOf(this.getKey(item));
                    this.whichItemsOpen.splice(index, 1);
                } else {
                    this.whichItemsOpen.push(this.getKey(item))
                }
            }

        },
        computed: {
            rootItems() {
                return this.sortedTable.filter(item => this.getParentKey(item) === null)
            },
            childrenItems() {
                let result = {};
                let currentValue;

                this.sortedTable.forEach(item => {
                    currentValue = this.getParentKey(item);

                    if (!(currentValue in result)) {
                        result[currentValue] = [];
                    }

                    result[currentValue].push(item);    
                })
                return result;
            },
            sortedTable() {
                let items = [...this.items]
                return items.sort((a, b) => {
                    if(this.sortIsAsc) {
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
                        click:() => this.sort(col.key),
                    }
                }, col.label))),
                this.rootItems.map(item => this.createRootAndChildrenRows(item)),
            ]);
        }
    }
</script>