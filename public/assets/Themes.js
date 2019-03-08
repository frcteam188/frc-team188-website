const redTheme = createMuiTheme({
  palette: {
    primary: {
      light: colors.red[300],
      main: colors.red[500],
      dark: colors.red[700],
    },
    secondary: {
      light: colors.green[300],
      main: colors.green[500],
      dark: colors.green[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});
const styles = theme => ({
  root: {
    textAlign: 'center',
    margin: 0,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

module.exports = [redTheme, blueTheme];