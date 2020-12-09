import { createStyles, Theme } from "@material-ui/core";

export type registerStyles = "root"; // add class create

export default (theme: Theme) => createStyles<registerStyles, {}>({
    root: {
      flex: 1,
      display: 'flex',
      padding: '0 24px',
      minHeight: '64px',
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'space-between'
    }

});

