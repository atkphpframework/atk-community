<?php
/**
 * The atkAgreementAttribute class represents an attribute of a node
 * that should always be true. The attribute will only validate if
 * the user has checked the agreement checkbox.
 * ie record only saved or updated if attribute is TRUE (ie checkbox 'ticked')
 *
 * @author Peter C. Verhage <peter@ibuildings.nl>
 * @version $Revision$
 * Eg of use
 * $attr = &$this->add(new atkagreementattribute("accept", AF_HIDE_LIST | AF_HIDE_VIEW));
 * $attr->setloadtype(NOLOAD);
 * $attr->setstoragetype(NOSTORE);
 */
atkimport("atk.attributes.atkboolattribute");

class atkagreementattribute extends atkboolattribute
{

    /**
     * Constructor.
     *
     * @param String $name attribute name
     * @param int $flags attribute flags
     * @return atkAgreementAttribute
     */
    var $msg_text;

    function atkagreementattribute($name, $flags = 0, $non_agreement_message = "")
    {
        if ($non_agreement_message === "") {
            $this->msg_text = atktext("not agreed", $this->getModule());
        }
        else {
            $this->msg_text = $non_agreement_message;
        }

        $this->atkBoolAttribute($name, $flags);
        $this->addFlag(AF_OBLIGATORY);
    }

    public function validate(&$record, $mode)
    {
        if (!$record[$this->fieldName()])
                atkTriggerError($record, $this, $this->msg_text);
    }

}
