import React from 'react';
import { useDispatch } from 'react-redux';
import {
  change
} from './displaySlice';
//import styles from './Counter.module.css';

export function Textdisplay() {
  //const display = useSelector(selectDisplay);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <input
          aria-label="Set display text amount"
          onChange={e => dispatch(change(e.target.value))}
        />
      </div>
    </div>
  );
}