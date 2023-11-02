<template>
  <div class="container">
    <h1>testList page</h1>
    <p>testList</p>
  </div>
</template>

<script setup>

const { logSuccess, logInfo, logWarn, logError } = useLoggerFile();
const error = new Error("Some error");
logError("Error occurred: %s", error.message);
logWarn("This is a warning: %d", 42);
logInfo("Value of pi is %f", 3.14159);
logSuccess("Value of pi success");

// console.log(`testList setup`);
// console.log(new Date().getTime());
// console.error(`error happen ${new Date().getTime()}`);

</script>
