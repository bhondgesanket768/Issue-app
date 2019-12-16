import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addissue,deleteissue,closeissue,likes,dislikes} from '../reudx/actions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import DeleteIcon from '@material-ui/icons/Delete';
import ClosedCaptionTwoToneIcon from '@material-ui/icons/ClosedCaptionTwoTone';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

// material ui design
const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      flexGrow: 2,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
        background:"pink"
      },
    input: {
        display: 'none',
    },
    padding: {
        padding: theme.spacing(0, 2),
    },
    margin: {
        margin: theme.spacing(2),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    root2: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        //padding: theme.spacing(0.5),
    },
  }));

const mapbox={
    padding:"15px",
    backgroundColor:"rgba(211, 211, 211)"
}

function Issues(){
    const [value,setvalue]=useState('');
    const [type,settype]=useState('');
    const [chip,setchip]=useState([]);
    const [filter,setfill]=useState('');
    const [filtername,setfiltername]=useState('');
    const [sort,setsort]=useState('');
    const [sort1,setsort1]=useState('');
    const [description,setdescription]=useState('');
    const list=useSelector((state)=>state.IssuesList);
    const dispatch=useDispatch();
    const fetch_data=localStorage.getItem('issue');
    const data=JSON.parse(fetch_data);
    var len,close=0
    var like=0;
    var dislike=0;
    var value_b=0;
    var type_array=[];
    var uniqueArray=[];
    
    var open=0
    if(data){
        len=data.IssuesList.length;
    }
    
    for(var i=0;i<len;i++){
        if(data.IssuesList[i].open===true){
            open+=1;
        }
    }
    close=len-open;
    
    function add(event){
        event.preventDefault();
        if(value!==""){
            dispatch(addissue({
                name:value,
                type:chip,
                open:true,
                Description:description,
                date:new Date(),
                like:like,
                dislike:dislike,
            }))
        }
        setvalue('');
        settype('');
        setchip([]);
        setdescription('');
    }

    const onKeyup=(event)=>{
        if(event.which===32){
            let input=event.target.value;
            if(input.length===0 || input[0]===""){
                return
            }
            setchip([...chip,`${input}`]);
            event.target.value="";
        }
    }

    // deleting the chip
    const handleDelete = chipToDelete => () => {
        setchip(chips => chips.filter(chip => chip !== chipToDelete));
      };

    // sorting through date and ascending and descending order //
 
        const latest=list.sort((a,b)=>{
            const ischeck=(sort==="latest") ? 1 : -1;
            return ischeck*(new Date(b.date) - new Date(a.date));
        })
        
        const oldest=latest.sort((a,b)=>{
            const isold=(sort==="oldest") ? 1: -1;
            return isold*(new Date(a.date)-new Date(b.date));
        })
    
    const namefilter=oldest.filter((todo)=>{
        return todo.name.toLowerCase().indexOf(filtername.toLowerCase()) !==-1
    })
// type search //
    for(var j=0;j<list.length;j++){
        for(var p=0;p<list[j].type.length;p++){
            if(list[j].type[p].toLowerCase()===filter.toLowerCase()){
                value_b=p;
            }
        }
    }
    const typefilter=namefilter.filter((todo)=>{
        let index1=value_b;
        if(todo.type.length>=index1+1){
            return todo.type[index1].toLowerCase().indexOf(filter.toLowerCase()) !==-1 
        }else{
            return todo.type.indexOf(filter.toLowerCase()) !==-1 
        }  
    })
    // end of type search //

    // search type by drop down
    for(var j=0;j<list.length;j++){
        for(var p=0;p<list[j].type.length;p++){
            type_array.push(list[j].type[p]);
        }
    }
    uniqueArray = type_array.filter(function(item, pos) {
        return type_array.indexOf(item) === pos;
    })
    console.log(type_array);
    console.log(uniqueArray);

    // material ui styles
    const classes = useStyles();
    return(
        <div>
            <div>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h2" >
                        Issues App
                    </Typography>
                </Paper>
            </div>
            <div>
                <form  noValidate autoComplete="off">
                    <div>
                    <TextField
                        id="standard-basic"
                        className={classes.textField}
                        label="Name of Issue"
                        margin="normal"
                        onChange={(event)=>setvalue(event.target.value)} value={value}
                    />
                    </div>
                    <div align="center">    
                    <Grid item xs={6}>
                    <Paper className={classes.root2} >
                        {chip.map(data => {
                            return (
                            <Chip
                                //label={data.label}
                                label={data}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                            />
                            );
                        })}
                    </Paper>
                    </Grid>
                    </div>
                    <div>
                    <TextField 
                        id="standard-basic"
                        className={classes.textField}
                        label="Add tags"
                        margin="normal"
                        onKeyUp={(event)=>onKeyup(event)}
                    />
                    </div>
                    <TextField
                        id="standard-textarea"
                        label="Description"
                        placeholder="Your Description here"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        onChange={(event)=>setdescription(event.target.value)} value={description}
                    />
                    <br></br>
                    <Button color="primary" className={classes.button} onClick={add}>
                        Add Issues
                    </Button>
                </form>
            </div>
            <div align="right" >
                
                <Badge color="primary" badgeContent={open} className={classes.margin}>
                    <Typography className={classes.padding}>Open Issues</Typography>
                </Badge>

                <Badge color="primary" badgeContent={close} className={classes.margin}>
                    <Typography className={classes.padding}>Closed Issues</Typography>
                </Badge>

                <div align="left">
                <TextField
                    id="outlined-search"
                    label="Search By Name"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={(event)=>setfiltername(event.target.value)}
                    value={filtername}
                    
                />

`               <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Search type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={filter}
                        onChange={(event)=>setfill(event.target.value)}
                    >
                        {uniqueArray.map((todo)=>(
                        <MenuItem value={todo}>{todo}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={sort}
                        onChange={(event)=>setsort(event.target.value)}
                    >
                        <MenuItem value="oldest">oldest</MenuItem>
                        <MenuItem value="latest">latest</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Sort2</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={sort1}
                        onChange={(event)=>setsort1(event.target.value)}
                    >
                        <MenuItem value="open">open</MenuItem>
                        <MenuItem value="closed">closed</MenuItem>
                    </Select>
                </FormControl>

                </div>
            </div>
                <div style={mapbox} >
                    {typefilter.map((todo,index)=>(
                        sort1==="open"?(
                            todo.open===true?(
                                <div style={mapbox} align="center">
                                    <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <h3 key={index.toString()}>
                                        <Typography variant="h5" component="h5" align="left">
                                            <b>{todo.name}</b>
                                            {todo.type.map((data)=>(
                                                <Button variant="outlined" color="primary" className={classes.button}>
                                                    {/*data.label*/}
                                                    {data}
                                                </Button>
                                            ))}   
                                        </Typography>
                                        <Typography variant="h6" component="p" align="left">
                                            {todo.Description} 
                                        </Typography>
                                        <div>
                                        <Grid item xs={12} align="right">
                                            <DeleteIcon onClick={()=>dispatch(deleteissue(index))} />
                                            <ClosedCaptionTwoToneIcon onClick={()=>dispatch(closeissue(index))}/>
                                        </Grid>
                                        <Grid item xs={12} align="left">
                                            <ThumbUpAltIcon onClick={()=>dispatch(likes(index))}/>{todo.like}{"   "}
                                            <ThumbDownAltIcon onClick={()=>dispatch(dislikes(index))}/>{todo.dislike}{"  "}
                                            
                                        </Grid>
                                        </div>
                                        </h3>
                                        </Paper>
                                    </Grid>
                                </div> 
                            ):("")
                        ):(sort1==="closed"?(
                            todo.open===false?(
                                <div style={mapbox} align="center">
                                    <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <h3 key={index.toString()}>
                                        <Typography variant="h5" component="h5" align="left">
                                            <b>{todo.name}</b>
                                            {todo.type.map((data)=>(
                                                <Button variant="outlined" color="primary" className={classes.button}>
                                                    {/*data.label*/}
                                                    {data}
                                                </Button>
                                            ))}   
                                        </Typography>
                                        <Typography variant="h6" component="p" align="left">
                                            {todo.Description} 
                                        </Typography>
                                        <Grid item xs={12} align="right">
                                            <DeleteIcon onClick={()=>dispatch(deleteissue(index))} />
                                        </Grid>
                                        <Grid item xs={12} align="left">
                                            <ThumbUpAltIcon onClick={()=>dispatch(likes(index))}/>{todo.like}{"   "}
                                            <ThumbDownAltIcon onClick={()=>dispatch(dislikes(index))}/>{todo.dislike}{"  "}
                                            
                                        </Grid>
                                        </h3>
                                </Paper>
                                </Grid>
                                </div> 
                            ):("")
                        ):(
                            todo.open===false?(
                                <div style={mapbox} align="center">
                                <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <h3 key={index.toString()}>
                                    <Typography variant="h5" component="h5" align="left">
                                            <b>{todo.name}</b> 
                                            {todo.type.map((data)=>(
                                                <Button variant="outlined" color="primary" className={classes.button}>
                                                    {/*data.label*/}
                                                    {data}
                                                </Button>
                                            ))}  
                                        </Typography>
                                        <Typography variant="h6" component="p" align="left">
                                            {todo.Description}
                                        </Typography>
                                    <Grid item xs={12} align="right">
                                            <DeleteIcon onClick={()=>dispatch(deleteissue(index))} />
                                        </Grid>
                                        <Grid item xs={12} align="left">
                                            <ThumbUpAltIcon onClick={()=>dispatch(likes(index))}/>{todo.like}{"   "}
                                            <ThumbDownAltIcon onClick={()=>dispatch(dislikes(index))}/>{todo.dislike}{"  "}
                                            
                                        </Grid>
                                    </h3>
                            </Paper>
                            </Grid>
                            </div>
                            ):(
                                <div style={mapbox} align="center">
                                <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <h3 key={index.toString()}>
                                        <Typography variant="h5" component="h5" align="left">
                                            <b>{todo.name}</b> 
                                            {todo.type.map((data)=>(
                                                    <Button variant="outlined" color="primary" className={classes.button}>
                                                        {/*data.label*/}
                                                        {data}
                                                    </Button>
                                                ))} 
                                        </Typography>
                                        <Typography variant="h6" component="p" align="left">
                                            {todo.Description}
                                        </Typography>
                                    <Grid item xs={12} align="right">
                                            <DeleteIcon onClick={()=>dispatch(deleteissue(index))} />
                                            <ClosedCaptionTwoToneIcon onClick={()=>dispatch(closeissue(index))}/>
                                        </Grid>
                                        <Grid item xs={12} align="left">
                                            <ThumbUpAltIcon onClick={()=>dispatch(likes(index))}/>{todo.like}{"   "}
                                            <ThumbDownAltIcon onClick={()=>dispatch(dislikes(index))}/>{todo.dislike}{"  "}
                                            
                                        </Grid>
                                    </h3>
                            </Paper>
                            </Grid>
                            </div>
                            )   
                        ))
                    ))}
                </div>
        </div>
    )
}

export default Issues

