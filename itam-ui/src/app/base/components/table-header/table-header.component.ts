import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-header',
    templateUrl: './table-header.component.html',
    styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {

    @Input() search: boolean;
    @Input() loader: boolean;
    @Input() isLoading: boolean;
    @Input() sort: boolean;
    @Input() noOfRecord: boolean;
    @Input() serverSide: boolean;
    @Input() customSize: any = [];
    @Output() onChange = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    _pageInfo: any;
    currentPage = null;
    searchBox = null;
    timeout = null;
    isSortMatched:boolean;
    size = [50, 100, 250, 500];
    sortBy = [{
        name: 'ID ASC',
        label: 'id,ASC'
    },
    {
        name: 'ID DESC',
        label: 'id,DESC'
    },
    {
        name: 'NAME ASC',
        label: 'name,ASC'
    },
    {
        name: 'NAME DESC',
        label: 'name,DESC'
    }]

    @Input()
    set pageInfo(details) {
        if (!details) {
            return;
        }
        if (this.customSize.length > 0) {
            this.size = this.customSize;
        }
        this.configPagination(details);
    }

    get pageInfo() {
        return this._pageInfo;
    }

    onkeypress(event: KeyboardEvent) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this._pageInfo.searchText = this.searchBox;
            this.onChangeTrigger();
        }, 1000);
    }

    onChangeTrigger() {
        this._pageInfo['number'] = this.currentPage - 1;
        this._pageInfo.searchText = this.searchBox;
        this.onChange.emit(this._pageInfo);
    }

    configPagination(details) {
        if (!details) {
            return;
        }
        this.currentPage = details['number'] + 1;
        this._pageInfo = details;
        if (this.size.indexOf(this._pageInfo['size']) == -1) {
            this._pageInfo.size = 50;
        }
        for(let i=0; i< this.sortBy.length;i++){
            if(this.sortBy[i].label == this.pageInfo['sort']){
                this.isSortMatched = true;
                break;  
            }else{
                this.isSortMatched = false;
            }
        }
        if (!this.isSortMatched) {
            this._pageInfo.sort = 'id,ASC';
        }

    }
}
