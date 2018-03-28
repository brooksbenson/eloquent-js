function landscape() {
  const flat = (size) => '_'.repeat(size);
  const mountain = (size) => '/' + '-'.repeat(size) + '\\';

  return flat(4) + mountain(5) + flat(4);
};

landscape(); //____/-----\____