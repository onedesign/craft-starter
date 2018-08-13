<?php

return [
  'logLevels' => getenv('ONELOGGER_LOG_LEVELS') ? explode(',', getenv('ONELOGGER_LOG_LEVELS')) : ['warning', 'error']
];
