{
  "apps":
    {
      "name": "zhihu",
      "cwd": "/home/ubuntu/blog",
      "script": "./bin/www",
      "exec_interpreter": "nodejs",
      "min_uptime": "60s",
      "max_restarts": 30,
      "exec_mode" : "fork",
      "error_file" : "./logs/error_file.log",
      "out_file": "./logs/out_file.log",
      "pid_file": "./logs/pid_file.log",
      "watch": false
    }
}