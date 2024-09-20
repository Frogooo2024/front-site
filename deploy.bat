@echo off
cls 

set service=frogooo.com
set svcname=dist.tar.gz

cd /d %~dp0

call npm run build
cd dist
call tar -czvf %~dp0%svcname% *.* 
cd ..

plink -batch -pw %psd% %user%@%host% "mkdir -p %root%/%service%"
pscp -batch -pw %psd% %~dp0%svcname% %user%@%host%:%root%/%service%/%svcname%
plink -batch -pw %psd% %user%@%host% "tar -xzvf %root%/%service%/%svcname% -C %root%/%service%"
plink -batch -pw %psd% %user%@%host% "rm -rf %root%/%service%/%svcname%"
del %~dp0%svcname%


