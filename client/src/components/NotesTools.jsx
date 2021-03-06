import React, {Component} from 'react';
import {getNotes} from '../actions/noteActions';
import {fetchNotes} from '../actions/noteActions'
import {connect} from 'react-redux';

class NotesTools extends Component {

    constructor(props) {
        super(props);
        props = this

    }

    componentDidMount() {
        this
            .props
            .getNotes();
    }

    fetch() {

        var limit = this.refs.limit.value === ""
            ? 10
            : this.refs.limit.value;
        var startFrom = this.refs.startFrom.value === ""
            ? 0
            : this.refs.startFrom.value;
        var orderBy = this.menu.value === ""
            ? "ASC"
            : this.menu.value;
        this.refs.limit.value = '';
        this.refs.startFrom.value = '';
        this.menu.value = "ASC";

        return {limit: limit, startFrom: startFrom, orderBy: orderBy}
    }

    render() {
        return (
            <div>
                <div className="tool-box">
                    <button onClick ={() => this.props.getNotes()}>
                        Show All Notes</button>
                    <br/>
                    <br/>
                    <label>
                        Start From
                    </label>
                    <input ref="startFrom" type="text"/>
                    <label >
                        Limit
                    </label>
                    <input ref="limit" type="text"/>

                    <select ref= {(input)=> this.menu = input}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <button onClick={() => this.props.fetchNotes(this.fetch())}>
                        Fetch
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        note: state.noteReducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotes: () => {
            dispatch(getNotes());
        },
        fetchNotes: (value) => {
            dispatch(fetchNotes(value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesTools);