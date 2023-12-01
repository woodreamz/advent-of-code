console.log('-- Starting script --');
const args = process.argv;

if (args.length > 2) {
  import('../2023/' + args[2] + '/index.js');
} else {
  console.log('Please provide a day number (ex: pnpm start 1).');
}
