import React from 'react'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const Wrapper = styled.div`
    width: 96vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
    margin-top: 5%;
    margin-left: 2%;
    margin-right: 2%;
    .paper {
        padding: 2%;
        width: 90%;
    }
    .cart {
        height: auto;
        width: 10%;
        margin-left: 1%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .row {
        cursor: pointer;
        :hover {
            background: #f7f7f7;
        }
    }
    @media (max-width: 600px) {
        flex-direction: column;
        .cart {
            width: 30%;
        }
    }
`

const store = [
    {'name': 'mango', 'price': 100, 'id': '3d'},
    {'name': 'lichi', 'price': 200, 'id': '3e'},
    {'name': 'jack', 'price': 300, 'id': '8h'},
    {'name': 'cap', 'price': 400, 'id': '9e'},
    {'name': 'shoe', 'price': 500, 'id': '4k'}
]

export default class Ecommerce extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart :  0
        }
    }
    addProduct = price => {
        this.setState({
            cart: this.state.cart+price
        })
    }

    removeProduct = () => {
        this.setState({
            cart: 0
        })
    }

    render () {
        return(
            <Wrapper>
                <Paper className='paper'>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">price</TableCell>
                            <TableCell align="right">id</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {store.map(row => (
                            <TableRow onClick={()=>this.addProduct(row.price)} className='row' key={row.name}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br/>
                <Paper className='paper cart'>
                    Cart : {this.state.cart}
                    <br/>
                    <Button onClick={()=>this.removeProduct()}>delete</Button>
                </Paper>
            </Wrapper>
        )
    }
}