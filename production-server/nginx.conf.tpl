

# Sets the amount of worker processes to the amount of CPU
# cores detected on the system.
worker_processes auto;

# Leave Nginx in foreground
daemon off;

# Redirect logs to stdout so we can collect them with Papertrail.
error_log /dev/stdout info;

events {
  # An eficient method for Linux 2.6+ based operating systems.
  use epoll;

  # Enables the use of an accept mutex (mutual exclusion) to open
  # listening sockets.
  accept_mutex on;

  # Defines the amount of connections that a worker process
  # may treat simultaneously.
  worker_connections 1024;
}

http {
  # Remove Nginx version from the headers/error pages
  server_tokens off;

  # Enables Gzip compression
  gzip on;

  # Defines the compression level of the algorithm.
  # The specified value ranges from 1 (low compression, faster for the CPU)
  # to 9 (high compression, slower).
  gzip_comp_level 2;

  # If the response body length is inferior to the specified value,
  # it is not compressed.
  gzip_min_length 512;

  # Defines a template to be utilized by the access_log directive,
  # describing the contents that should be included in an entry of
  # the access log.
  log_format docker '[$time_iso8601] request_method=$request_method request_uri=$request_uri from=$remote_addr to=$upstream_addr status=$status request_time=$request_time';

  # Redirect logs to stdout so we can collect them with Papertrail.
  access_log /dev/stdout docker;
  error_log /dev/stdout;

  # Must read the body in 60 seconds.
  # Higher than the 55s Heroku router limit so the H15 will be triggered.
  client_body_timeout 60s;

  # Includes Nginx basic set of MIME types.
  include /etc/nginx/mime.types;

  server {
    # Uses the Heroku available in ENV.
    listen $PORT;

    # Use CloudFlare as DNS
    resolver 1.1.1.1 1.0.0.1;

    server_name _;

    # Defines the size of the buffer that Nginx allocates to request headers
    large_client_header_buffers 4 32k;

    root $APP_FOLDER;
    index index.html;
    location / {
      try_files $uri $uri/ /index.html;
    }

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
  }
}
