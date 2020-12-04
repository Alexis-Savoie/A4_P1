import { createStyles, Theme } from "@material-ui/core";

export type Styles = "root"; // add class create
const styles = (theme: Theme) => createStyles<Styles, {}>({
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

export default styles;