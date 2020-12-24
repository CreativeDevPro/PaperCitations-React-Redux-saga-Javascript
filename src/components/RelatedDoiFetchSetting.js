import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    container: {
        color: 'black',
        backgroundColor: 'white',
        minWidth: '40px',
        minHeight: '89px',
        borderRadius: 1,
        position: "relative", 
        border: "1px solid #dddddd",
        borderRadius: "10px",
        "&::before,&::after": {
            content: "''",
            position: "absolute",
            right: "42px",
            top: "-16px",
            borderColor: "transparent",
            borderStyle: "solid"
          },
          "&::before": {
            borderWidth: "8px",
            borderLeft: "10px solid transparent",
            borderBottom: "10px solid white",
            borderRight: "10px solid transparent"
          },
          "&::after": {
            borderRadius: "3px",
            borderWidth: "5px",
            borderLeftColor: "#fffff" /* color of the triangle */,
            borderBottomColor: "#fffff" /* color of the triangle */
          }
    },
  
  }));

const RelatedDoiFetchSetting = (props) => {
  const { maxLayers, maxNodes, setMaxLayers, setMaxNodes } = props;
  
  const classes = useStyles();
  const handleMaxLayersChanged = (e) => {
      let value = e.target.value;
      setMaxLayers(value);
  }
  const handleMaxNodesChanged = (e) => {
        let value = e.target.value;
        setMaxNodes(value);
  }
  return (
    <div className={classes.container}>
        <div >
            <label style={{display: "flex", fontSize: "13px", marginTop: "15px", marginLeft: "5px"}}>
                Max layers:
                <input type="number" min="1" max="10" name="maxLayers" value={maxLayers} onChange={(e) => {handleMaxLayersChanged(e)}} style={{width: "100px", height: "23px", marginLeft: "10px", marginTop: "-6px"}}/>
            </label>
        </div>
        <div >
            <label style={{display: "flex", fontSize: "13px", marginTop: "15px", marginLeft: "5px"}}>
                Max nodes:
                <input type="number" min="10" max="2000" name="maxNodes" value={maxNodes} onChange={(e) => {handleMaxNodesChanged(e)}} style={{width: "100px", height: "23px", marginLeft: "10px", marginTop: "-6px"}}/>
            </label>
        </div>
    </div>
  )
};

const mapStateToProps=(state)=>{

  return {
      maxLayers: state.maxLayers,
      maxNodes: state.maxNodes,
  }
}

const mapStateToDispatch=(dispatch)=>{
  return {
    setMaxLayers: (payload)=>{
        dispatch({type:'SET_MAX_LAYERS', payload});
    },
    setMaxNodes: (payload)=>{
        dispatch({type:'SET_MAX_NODES', payload});
    },
  }
}


RelatedDoiFetchSetting.propTypes = {};

RelatedDoiFetchSetting.defaultProps = {};

export default connect(mapStateToProps, mapStateToDispatch)(RelatedDoiFetchSetting);
