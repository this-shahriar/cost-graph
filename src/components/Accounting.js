import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: gray;
    .container {
        height: 90%;
        width: 90%;
    }
    .holder {
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: row;
    }
    .graph {
        height: inherit;
    }
    .paper {
        width: 100%;
        padding: 5%;
        margin: 1% 1% 1% 1%;
        background: white;
        color: #92929c;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .titleText {
            font-size: 2vw;
            font-weight: 900;
        }
        .subText {
            font-size: 1vw;
            font-weight: 400;
        }
    }
    @media (max-width: 600px) {
        height: 170vh;
        .holder {
            flex-direction: column;
        }
        .paper {
            padding: 10%;
            width: 75%;
            height: 85vh;
            .titleText {
                font-size: 2vh;
            }
            .subText {
                font-size: 2vh;
            }
        }
    }
`
let data = {}
let inputs = []
let objects = {}
let incomeBalance = 0

export default class Accounting extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            amount : '',
            des : '',
            type : ''
        }
    }

    //get and set amount from form-data
    amount = event => {
        this.setState({
            amount: event.target.value
        })
        objects = {...objects, amount : event.target.value}
    }

    //get and description amount from form-data
    description = event => {
        this.setState({
            des: event.target.value
        })
        objects = {...objects, description : event.target.value}
    }

    // optimized
    //get and set type_of from form-data
    type = event => {
        this.setState({
            type: event.target.value       
        })
        objects = {...objects, type : event.target.value}
    }

    // unoptimized
    // backup_balance = () => {
    //     this.setState({
    //         type: 'balance'    
    //     })
    //     objects = {...objects, type : 'balance'}
    // }

    // backup_cost = () => {
    //     this.setState({
    //         type: 'cost'    
    //     })
    //     objects = {...objects, type : 'cost'}
    // }

    //callback to form submission
    //fetch local storage data
    //I don't know if it's necessary if it's an live api then we could see the difference
    //updates the graph
    upDateTheGraph = () => {
        try {
            const local = JSON.parse(localStorage.getItem('inputs'))
            console.log(local[0])
            let balance = []
            let cost = []
            let totalBalance = 0
            let totalCost = 0
            local.forEach(item => {
                if (item.type === 'balance') {
                    balance.push(item.amount)
                    totalBalance += parseInt(item.amount)
                }
            })
            local.forEach(item => {
                if (item.type === 'cost') {
                    cost.push(item.amount)
                    totalCost += parseInt(item.amount)
                }
            })
            //sets the balance block by calculating total balance and deducting total cost
            incomeBalance = totalBalance - totalCost

            //data format for ---chart_js_2---
            data = {
                labels: balance,
                datasets: [
                {
                    label: 'Balance',
                    backgroundColor: 'rgba(241, 248, 255 ,0.2)',
                    borderColor: 'blue',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: balance
                },
                {
                    label: 'Cost',
                    backgroundColor: 'rgba(241, 248, 255 ,0.2)',
                    borderColor: 'green',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: cost
                }
                ]
            };
        } catch (error) {
            alert('please give valid input')
            console.error(error)
        }
    }

    //executing form submission and prepare for next data
    //sets local storage
    submit = event => {
        event.preventDefault()
        this.setState({
            amount : '',
            des : '',
            type : ''
        })
        inputs.push(objects)
        objects = {}
        localStorage.setItem('inputs', JSON.stringify(inputs))
        this.upDateTheGraph()
    }

    //Unit tests
    // test1 = () => {
    //     this.setState({
    //         amount : -1,
    //         des : '34',
    //         type : null
    //     })
    // }
    render () {
        return(
            <Wrapper>
                <div className='container'>
                    <div className='holder'>
                        <Paper className='paper'>
                            <form  onSubmit={this.submit}>
                                <Typography className='titleText'>
                                    Enter imcomes and costs
                                </Typography>
                                <TextField
                                    id="standard-name"
                                    value={this.state.amount}
                                    onChange={this.amount}
                                    margin="normal"
                                    autoFocus
                                    margin="dense"
                                    label="Amount"
                                    type='number'
                                    fullWidth
                                /> 
                                <TextField
                                    id="standard-name"
                                    value={this.state.des}
                                    onChange={this.description}
                                    margin="normal"
                                    autoFocus
                                    margin="dense"
                                    type='text'
                                    label="Description"
                                    fullWidth
                                />
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select"
                                    value={this.state.type}
                                    onChange={this.type}
                                    // onChange={handleChange('currency')}
                                    // SelectProps={{
                                    // MenuProps: {
                                    //     className: classes.menu,
                                    // },
                                    // }}
                                    helperText="Please select balance/cost"
                                    margin="normal" 
                                >  
                                    <MenuItem key='balance' value='balance'>
                                        Balance
                                    </MenuItem>
                                    <MenuItem key='cost' value='cost'>
                                        Cost
                                    </MenuItem>
                                </TextField>
                                <br/><br/>
                                <Button variant="outlined" type='submit'>
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                        <Paper className='paper'>
                            <Typography className='titleText'>
                                Balance
                            </Typography>
                            <br/>
                            {incomeBalance}
                        </Paper>
                    </div>
                    <div className='holder'>
                        <Paper className='paper'>
                            <Line
                                className='graph'
                                data={data}
                                width={100}
                                height={20}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </Paper>
                    </div>
                </div>
            </Wrapper>
        )
    }
}