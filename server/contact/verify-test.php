<?php
require __DIR__.'/verify.php';
$valid=['success'=>true,'score'=>0.9,'action'=>'contact_submit','hostname'=>'ideamos.com.ar','challenge_ts'=>gmdate('c')];
$tests=['valid'=>[$valid,true], 'missing'=>[[],false], 'failure'=>[array_replace($valid,['success'=>false]),false], 'low_score'=>[array_replace($valid,['score'=>0.1]),false], 'wrong_action'=>[array_replace($valid,['action'=>'login']),false], 'wrong_host'=>[array_replace($valid,['hostname'=>'evil.example']),false], 'expired'=>[array_replace($valid,['challenge_ts'=>gmdate('c',time()-180)]),false], 'quota_error'=>[array_replace($valid,['error-codes'=>['Over free quota.']]),false]];
foreach($tests as $name=>[$input,$expected]){if(ideamos_recaptcha_valid($input)!==$expected){fwrite(STDERR,$name.' failed');exit(1);}}
echo count($tests).' verification policy checks passed';
